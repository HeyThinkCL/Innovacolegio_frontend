import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CursosService } from '../../../../../services/libros/cursos.service';
import {ConfiguracionService} from '../../../../../services/sistema/configuracion.service';
import {ConfigNotasService } from '../../../../../services/sistema/configuraciones/config-notas.service';

@Component({
  selector: 'app-notas-electivo-ver',
  templateUrl: './notas-electivo-ver.component.html',
  styleUrls: ['./notas-electivo-ver.component.css']
})
export class NotasElectivoVerComponent implements OnInit {
  @ViewChild('modalInfo') modalInfo: ModalComponent;
  @ViewChild('modalConfigInfo') modalConfigInfo: ModalComponent;

  infoNota = {
    'contenido':'',
    'fecha':'',
    'coeficiente':null,
  };

  electivo: any;

  selectedAsignatura: any;
  selectedAsignaturaAlumnos = [];

  cursos = [];

  private notasCongif: any = {};
  decimals: string;

  id: number;
  private sub: any;

  constructor(
    private router: Router,
    private cursosService: CursosService,
    private route: ActivatedRoute,
    private configuracionService: ConfiguracionService,
    private configNotasService: ConfigNotasService,
  ) { }

  ngOnInit() {
    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.parent.parent.params
      .switchMap((params: Params) => this.cursosService.getElectivoById(+params['id']))
      .subscribe((res) => {
        this.electivo = res.electivo;
        this.cursos = res.cursos;

        this.cursosService.getAsignaturasByCursoId(this.cursos[0].curso.id).subscribe(asigns => {
          if(asigns && asigns.asignaturas){
            this.selectedAsignatura = asigns.asignaturas.find(a => a.asignatura.datos.id==this.electivo.id).asignatura;
            this.getAlumnos(this.selectedAsignatura);
          }
        });

        this.configuracionService.getConfiguraciones().subscribe(configs => {

          let config = configs.find(c => c.glosa == 'Notas y Ponderaciones' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId);

          this.notasCongif = {
            'notas': {
              'decimales':null,
              'aprox':null,
            }
          };

          this.configNotasService.getConfigNotasById(config.id).subscribe(subRes => {
            if(subRes && subRes.notas && subRes.notas.decimales && subRes.notas.aprox){
              this.notasCongif.notas.decimales = subRes.notas.decimales;
              this.notasCongif.notas.aprox = subRes.notas.aprox;

              this.decimals = '1.1-'+this.notasCongif.notas.decimales.toString();

            } else {

              let currentRol = +atob(atob(JSON.parse(localStorage.getItem('currentUser')).rol))[5];
              if(currentRol==4||currentRol==5){
                this.router.navigate(['app/alerta-configuracion',2]);
              } else {
                this.router.navigate(['app/sistema/configuracion/notas']);
              }
            }

          });
        });
      });
  }

  createRange(n: number){
    let items: number[] = [];
    for(let i = 1; i <= n; i++){
      items.push(i);
    }
    return items;
  }

  getAlumnos(asignatura: any){
    for(let curso of this.cursos){
      this.cursosService.getNotasAlumnosByElectivoId(curso.curso.id,asignatura.datos.id).subscribe((res) => {
        for(let alumno of res.notas_alumnos){
          this.selectedAsignaturaAlumnos.push(alumno);
        }
      })
    }
  }

  getCursoByAlumnoId(alumnoId: number){
    for(let curso of this.cursos){
      if(curso.alumnos.find(a => a.id==alumnoId)){
        return `${curso.curso.grado} ${curso.curso.curso}`
      }
    }
    return '';
  }

  setInfoNota(index: number) {
    this.infoNota = this.selectedAsignatura.info_notas[index];
  }

  ////modal
  //info
  modalInfoOpen(index: number){
    this.setInfoNota(index);
    this.modalInfo.open('sm');
  }

  modalInfoClose(){
    this.infoNota = {
      'contenido':'',
      'fecha':'',
      'coeficiente':null,
    };
    this.modalInfo.close();
  }

  modalConfigInfoOpen(){
    this.modalConfigInfo.open('sm');
  }

  modalConfigInfoClose(){
    this.modalConfigInfo.close();
  }

}
