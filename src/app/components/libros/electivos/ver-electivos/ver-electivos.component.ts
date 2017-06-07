import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {ColegiosService} from "../../../../services/sistema/colegios.service";
import {ConfiguracionService} from "../../../../services/sistema/configuracion.service";
import {PlanDeEstudiosService} from "../../../../services/sistema/configuraciones/plan-de-estudios.service";

@Component({
  selector: 'app-ver-electivos',
  templateUrl: './ver-electivos.component.html',
  styleUrls: ['./ver-electivos.component.css']
})
export class VerElectivosComponent implements OnInit {

  filterData:string  = '';
  filterKeys = ['nombre'];

  private electivos = [];
  private planesDeEstudio = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private colegioService: ColegiosService,
    private configuracionService: ConfiguracionService,
    private planesDeEstudiosService: PlanDeEstudiosService,
  ) { }

  ngOnInit() {

    this.colegioService.getAsignaturasByColegioId().subscribe(asigns => {
      if(asigns && asigns.length>0){
        for(let a of asigns){
          if(a.electivo){
            this.electivos.push(a);
          }
        }
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
      })
    })
  }

  getPlanEstudiosByPlanId(planId: number): string{
    let plan = this.planesDeEstudio.find(p => p.id == planId);
    if(plan){
      return plan.decreto.length>60 ? plan.decreto.substring(0,plan.decreto.length-28)+'...' : plan.decreto;
    }
    return '';
  }

  goToElectivo(electivoId: number){
    this.router.navigate(['./',electivoId],{relativeTo:this.route})
  }

}
