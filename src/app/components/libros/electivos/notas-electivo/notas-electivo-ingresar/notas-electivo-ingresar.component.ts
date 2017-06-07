import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { CursosService } from '../../../../../services/libros/cursos.service';
import { NotasService } from '../../../../../services/libros/notas.service';
import {ConfiguracionService} from '../../../../../services/sistema/configuracion.service';
import {ConfigNotasService } from '../../../../../services/sistema/configuraciones/config-notas.service';

@Component({
  selector: 'app-notas-electivo-ingresar',
  templateUrl: './notas-electivo-ingresar.component.html',
  styleUrls: ['./notas-electivo-ingresar.component.css']
})
export class NotasElectivoIngresarComponent implements OnInit {
  @ViewChild('modalDelete') modalDelete: ModalComponent;
  @ViewChild('modalCreate') modalCreate: ModalComponent;
  @ViewChild('modalInfo') modalInfo: ModalComponent;
  @ViewChild('modalConfirm') modalConfirm: ModalComponent;
  @ViewChild('modalConfigInfo') modalConfigInfo: ModalComponent;

  id: number;
  private sub: any;

  private notasCongif: any = {};
  decimals: string;

  renderView: boolean;

  electivo: any;

  selectedAsignatura: any;
  selectedAsignaturaAlumnos = [];

  cursos = [];

  infoNota = {
    'contenido':'',
    'fecha':'',
    'coeficiente':null,
  };
  createdNota = {
    'contenido':'',
    'fecha':'',
    'coeficiente':null,
  };
  notaToDelete = {
    'evaluacion': {},
    'notas': [
      {
        'alumno': {
          'id':null,
          'lista':null,
          'nombre':'',
          'apellido_paterno':'',
          'apellido_materno':'',
        },
        'nota': {
          'id':null,
          'valor':null,
        }
      }
    ],
  };



  constructor(
    private cursosService: CursosService,
    private notasService: NotasService,
    private router: Router,
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
    if(this.selectedAsignaturaAlumnos.length>0){
      this.selectedAsignaturaAlumnos = [];
    }
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

  notaEspecialChanged(nota,event: any){
    nota.valor=event;
  }

  restrictValue(nota: any){
    if(!this.selectedAsignatura.eval){
      if(nota.valor > 7.0){
        nota.valor=7.0;
      }  else if(nota.valor == 0){
        nota.valor = null;
      } else if(nota.valor < 1.0 && nota.valor!=null){
        nota.valor=1.0;
      }
    } else if(this.selectedAsignatura.eval==1){
      nota.valor = Math.trunc(nota.valor)
      if(nota.valor > 100){
        nota.valor=100;
      }  else if(nota.valor == 0){
        nota.valor = null;
      } else if(nota.valor < 0 && nota.valor!=null){
        nota.valor=0;
      }
    }

  }

  discreteValue(nota: any){
    if(isNaN(nota.valor)){
      nota.valor = null;
    }
  }

  onChange(nota: any){
    this.saveNota(nota);
  }

  //../services
  saveNota(nota: any){
    if(!this.selectedAsignatura.eval || +this.selectedAsignatura.eval==1){
      this.restrictValue(nota);
    } else {
      this.discreteValue(nota);
    }
    this.notasService.updateNota(nota,this.selectedAsignatura.datos.id).subscribe((res) =>{
      nota = res;
    });
  }

  saveNotas(){
    for (let alumno of this.selectedAsignaturaAlumnos){
      for (let nota of alumno.notas){
        this.saveNota(nota);
      }
    }
    this.modalConfirmOpen();
  }

  createNota(){
    this.cursosService.createElectivoNota(this.id,this.selectedAsignatura.datos.id, this.createdNota).subscribe((res) => {
      this.createdNota = {
        'contenido':'',
        'fecha':'',
        'coeficiente':null,
      };
      this.cursosService.getAsignaturasByCursoId(this.cursos[0].curso.id).subscribe(asigns => {
        if(asigns && asigns.asignaturas){
          this.selectedAsignatura = asigns.asignaturas.find(a => a.asignatura.datos.id==this.electivo.id).asignatura;
          this.getAlumnos(this.selectedAsignatura);
        }
        this.modalCreate.close();
      });
    });

  }

  deleteNota(){
    let notas = [];
    for (let nota of this.notaToDelete.notas){
      notas.push(nota.nota.id);
    }

    this.renderView = false;
    this.notasService.deleteNotas(notas).subscribe(() => {
      this.notaToDelete = {
        'evaluacion': {},
        'notas': [],
      };

      this.cursosService.getAsignaturasByCursoId(this.cursos[0].curso.id).subscribe(asigns => {
        if(asigns && asigns.asignaturas){
          this.selectedAsignatura = asigns.asignaturas.find(a => a.asignatura.datos.id==this.electivo.id).asignatura;
          this.getAlumnos(this.selectedAsignatura);
        }
        this.modalDelete.close();
      });
    })
  }

  //set

  setNotaToDelete(index: number) {
    this.notaToDelete = {
      'evaluacion': {},
      'notas': [],
    };

    this.notaToDelete.evaluacion = this.selectedAsignatura.info_notas[index];
    for(let alumno of this.selectedAsignaturaAlumnos){
      this.notaToDelete.notas.push(
        {
          'alumno': {
            'id':alumno.alumno.id,
            'lista':alumno.alumno.lista,
            'nombre':alumno.alumno.nombre,
            'apellido_paterno':alumno.alumno.apellido_paterno,
            'apellido_materno':alumno.alumno.apellido_materno,
          },
          'nota': alumno.notas[index]
        }
      );
    }
    index = null;
  }

  //TAB behaviour
  checkTab(e, alumnoIdx: number, notaIdx: number){
    if(e.keyCode == 9){
      e.preventDefault();
      if(alumnoIdx+1 < this.selectedAsignaturaAlumnos.length){

        let nextNotaId: number = this.selectedAsignaturaAlumnos[alumnoIdx+1].notas[notaIdx].id;
        let nextNotaElement = document.getElementById(nextNotaId.toString());
        nextNotaElement.focus();

      } else if(notaIdx+1 < this.selectedAsignaturaAlumnos[0].notas.length){

        let nextNotaId: number = this.selectedAsignaturaAlumnos[0].notas[notaIdx+1].id;
        let nextNotaElement = document.getElementById(nextNotaId.toString());
        nextNotaElement.focus();

      }

    }
  }

  ////modals

  //delete
  modalDeleteOpen(){
    this.modalDelete.open();
  }

  modalDeleteClose(){
    this.deleteNota();
  }

  modalDeleteDismiss(){
    this.modalDelete.dismiss();
  }
  //create
  modalCreateOpen(){
    this.modalCreate.open('lg');
  }
  modalCreateClose(){
    this.createNota();
  }
  modalCreateDismiss(){
    this.modalCreate.dismiss();
  }
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
  //confirm
  modalConfirmOpen(){
    this.modalConfirm.open('sm');
  }

  modalConfirmClose(){
    this.modalConfirm.close();
  }

  //info config
  modalConfigInfoOpen(){
    this.modalConfigInfo.open('sm');
  }

  modalConfigInfoClose(){
    this.modalConfigInfo.close();
  }

}
