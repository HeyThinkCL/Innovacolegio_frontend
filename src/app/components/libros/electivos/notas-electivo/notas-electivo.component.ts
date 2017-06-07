import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { CursosService } from '../../../../services/libros/cursos.service';
import {ConfiguracionService} from '../../../../services/sistema/configuracion.service';
import {PlanDeEstudiosService} from "../../../../services/sistema/configuraciones/plan-de-estudios.service";

@Component({
  selector: 'app-notas-electivo',
  templateUrl: './notas-electivo.component.html',
  styleUrls: ['./notas-electivo.component.css']
})
export class NotasElectivoComponent implements OnInit {

  electivo: any;
  private planesDeEstudio = [];

  id: number;
  private sub: any;

  private currentTabPath: string = '';
  tabs = [
    {"id":1,"path":'ver',"label":"Ver","icon":"icon-eye"},
    {"id":2,"path":'ingresar',"label":"Ingresar","icon":"icon-plus"},
  ];

  constructor(
    private router: Router,
    private cursosService: CursosService,
    private route: ActivatedRoute,
    private configuracionService: ConfiguracionService,
    private planesDeEstudiosService: PlanDeEstudiosService,
  ) {
    this.router.events.subscribe((res) => {
        this.currentTabPath = this.route.children[0].toString();
      }
    )
  }

  ngOnInit() {
    this.sub = this.route.parent.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.parent.params
      .switchMap((params: Params) => this.cursosService.getElectivoById(+params['id']))
      .subscribe((res) => {
        this.electivo = res.electivo;
        this.configuracionService.getConfiguraciones().subscribe(configs => {
          let configId = configs.find(c => c.glosa == 'Planes de Estudio y Tipos de Enseñanza' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;

          this.planesDeEstudiosService.getConfigPlanesDeEstudio(configId).subscribe(res => {
            if(res && res.planes && res.planes.length>0){

              this.planesDeEstudio = res.planes;
            } else {
              let currentRol = +atob(atob(JSON.parse(localStorage.getItem('currentUser')).rol))[5];
              if(currentRol==4||currentRol==5){
                this.router.navigate(['app/alerta-configuracion',3]);
              } else {
                this.router.navigate(['app/sistema/configuracion/planes-ensenanza']);
              }
            }
          })
        })
      });
  }

  getPlanEstudiosByPlanId(planId: number): string{
    let plan = this.planesDeEstudio.find(p => p.id == planId);
    if(plan){
      return plan.decreto.length>60 ? plan.decreto.substring(0,plan.decreto.length-28)+'...' : plan.decreto;
    }
    return '';
  }

  goBack(): void {
    //this.location.back navigates inside tabs, bad for tab logic.
    this.router.navigate(['./'],{relativeTo: this.route.parent.parent});
  }

}
