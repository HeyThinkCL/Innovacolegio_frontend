import {animate, Component, OnInit, style, transition, trigger, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Location }       from '@angular/common';

import {ColegiosService} from "../../../../services/sistema/colegios.service";
import {ConfiguracionService} from "../../../../services/sistema/configuracion.service";
import {PlanDeEstudiosService} from "../../../../services/sistema/configuraciones/plan-de-estudios.service";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {ConfigNotasService} from "../../../../services/sistema/configuraciones/config-notas.service";

@Component({
  selector: 'app-modificar-asignatura',
  templateUrl: './modificar-asignatura.component.html',
  styleUrls: ['./modificar-asignatura.component.css'],
  animations: [
    trigger(
      'fade', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('90ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('90ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class ModificarAsignaturaComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  private planesDeEstudio = [];
  private asignatura: any;

  private especial: boolean = false;
  private selectEscalas = [];

  id: number;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private colegioService: ColegiosService,
    private configuracionService: ConfiguracionService,
    private planesDeEstudiosService: PlanDeEstudiosService,
    private configNotasService: ConfigNotasService,
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.colegioService.getAsignatura(+params['id']))
      .subscribe(asign => {
        this.asignatura = asign;
        if(this.asignatura.eval){
          this.especial=true;
        }
      });

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
      });

      let config = configs.find(c => c.glosa == 'Notas y Ponderaciones' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId);

      this.configNotasService.getConfigNotasById(config.id).subscribe(subRes => {
        if(subRes && subRes.escalas ){
          if(JSON.parse(subRes.escalas)){
            for(let escalaId of subRes.escalas){
              if(+escalaId==1){
                this.selectEscalas.push({
                  'id':+escalaId,
                  'glosa':'Escala Numérica 0 a 100'
                })
              } else if(+escalaId==2){
                this.selectEscalas.push({
                  'id':+escalaId,
                  'glosa':'Escala Oficial Educación Parvularia'
                })
              } else if(+escalaId==3){
                this.selectEscalas.push({
                  'id':+escalaId,
                  'glosa':'Escala Modificada Educación Parvularia'
                })
              } else if(+escalaId==4){
                this.selectEscalas.push({
                  'id':+escalaId,
                  'glosa':'Escala Especial'
                })
              }
            }
          }
        } else {
          let currentRol = +atob(atob(JSON.parse(localStorage.getItem('currentUser')).rol))[5];
          if(currentRol==4||currentRol==5){
            this.router.navigate(['app/alerta-configuracion',2]);
          } else {
            this.router.navigate(['app/sistema/configuracion/notas']);
          }
        }

      });

    })
  }

  getPlanEstudiosByPlanId(planId: number): string{
    let plan = this.planesDeEstudio.find(p => p.id == planId);
    if(plan){
      return plan.decreto.length>60 ? plan.decreto.substring(0,plan.decreto.length-28)+'...' : plan.decreto;
    }
    return '';
  }

  checkEscala(id){
    return !!(this.especial&&(this.asignatura.eval == +id));
  }

  saveAsignatura(){
    if(!this.especial){
      this.asignatura.eval = null;
    }

    this.colegioService.updateAsignatura(this.asignatura).subscribe(res => {
      this.modalOpen()
    })
  }

  goBack(): void {
    this.location.back();
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }

}
