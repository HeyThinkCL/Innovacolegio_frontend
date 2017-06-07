import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';
import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';
import { AsignaturasEspecialesService } from '../../../../services/sistema/configuraciones/asignaturas-especiales.service';
import {ColegiosService} from '../../../../services/sistema/colegios.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-asignaturas-especiales',
  templateUrl: './asignaturas-especiales.component.html',
  styleUrls: ['./asignaturas-especiales.component.css']
})
export class AsignaturasEspecialesComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  planesDeEstudio = [];
  //planes de estudio select2
  public selectPlanesData: Array<Select2OptionData> = [];
  public selectPlanesOptions: Select2Options;
  public selectPlanesRender: boolean = false;

  allAsignaturas = [];

  private configId;
  private configuracion = {
    'asignatura':{
      'nombre':null,
    },
    'planes_estudio':[]
  };

  constructor(
    private location: Location,
    private router: Router,
    private asignaturasEspecialesService: AsignaturasEspecialesService,
    private planDeEStudiosService: PlanDeEstudiosService,
    private configuracionService: ConfiguracionService,
    private colegiosService: ColegiosService,
  ) { }

  ngOnInit() {
    this.configuracionService.getConfiguraciones().subscribe(res => {
      this.configId = res.find(c => c.glosa == 'Asignaturas Especiales' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;
      let _planConfigId = res.find(c => c.glosa == 'Planes de Estudio y Tipos de Enseñanza' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;
      this.planDeEStudiosService.getConfigPlanesDeEstudio(_planConfigId).subscribe(res => {
        if(res && res.planes && res.planes.length>0){
          this.planesDeEstudio = res.planes;

          this.selectPlanesRender = false;
          for (let plan of this.planesDeEstudio) {
            this.selectPlanesData.push({
              id: plan.id,
              text: plan.decreto.length > 70 ? plan.decreto.substring(0, plan.decreto.length - 18) + '...' : plan.decreto,
            })
          }
          this.selectPlanesRender = true;
        } else {
          let currentRol = +atob(atob(JSON.parse(localStorage.getItem('currentUser')).rol))[5];
          if(currentRol==4||currentRol==5){
            this.router.navigate(['app/alerta-configuracion',3]);
          } else {
            this.router.navigate(['app/sistema/configuracion/planes-ensenanza']);
          }
        }
      });
    });

    this.selectPlanesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Plan de Estudios',
      multiple: true,
    };

    this.colegiosService.getAsignaturasByColegioId().subscribe(asigns => {
      for(let asignatura of asigns){
        if(asignatura.especial && !asignatura.obligatoria){
          if(this.allAsignaturas.length<1 || this.allAsignaturas.findIndex(a => a.nombre == asignatura.nombre)==-1){

            let a = JSON.parse(JSON.stringify(asignatura));
            delete a.id;
            delete a.plan_id;

            a['asignaturas_id'] = [asignatura.id];
            a['planes_id']=[asignatura.plan_id];
            this.allAsignaturas.push(a);

          } else if (this.allAsignaturas.length>0 && !(this.allAsignaturas.findIndex(a => a.nombre == asignatura.nombre)==-1)){
            let a = this.allAsignaturas.find(a => a.nombre == asignatura.nombre);
            a.asignaturas_id.push(asignatura.id);
            a.planes_id.push(asignatura.plan_id);
          }
        }
      }
    });
  }

  saveAsignatura(){
    this.asignaturasEspecialesService.createAsignaturaEspecial(this.configuracion,this.configId).subscribe(res => {
      if(res){
        this.configuracion.asignatura.nombre = null;
        this.configuracion.planes_estudio = [];

        this.colegiosService.getAsignaturasByColegioId().subscribe(asigns => {
          for(let asignatura of asigns){
            if(asignatura.especial && !asignatura.obligatoria){
              if(this.allAsignaturas.length<1 || this.allAsignaturas.findIndex(a => a.nombre == asignatura.nombre)==-1){
                let a = JSON.parse(JSON.stringify(asignatura));
                delete a.id;
                delete a.plan_id;

                a['asignaturas_id'] = [asignatura.id];
                a['planes_id']=[asignatura.plan_id];
                this.allAsignaturas.push(a);

              } else if (this.allAsignaturas.length>0 && !(this.allAsignaturas.findIndex(a => a.nombre == asignatura.nombre)==-1)){
                let a = this.allAsignaturas.find(a => a.nombre == asignatura.nombre);
                if(a.asignaturas_id.findIndex(id => id == asignatura.id)==-1){
                  a.asignaturas_id.push(asignatura.id);
                  a.planes_id.push(asignatura.plan_id);
                }
              }
            }
          }
        });
      }
    })
  }

  deleteAsignatura(asignatura){
    this.asignaturasEspecialesService.deleteAsignaturaEspecial(asignatura.asignaturas_id).subscribe(res => {
      let asignaturaIdx = this.allAsignaturas.findIndex(a => a.nombre == asignatura.nombre);
      this.allAsignaturas.splice(asignaturaIdx,1);
    })

  }

  planChanged(value: any){
    this.configuracion.planes_estudio = value;
  }

  modalOpen(){
    this.modal.open('sm');
  }

  modalClose(){
    this.modal.close();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
