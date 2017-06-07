import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }       from '@angular/common';

import { connectionErrorMsg } from '../../../spinner/spinner.component';

import {ConfiguracionService} from '../../../../services/sistema/configuracion.service';

@Component({
  selector: 'app-configuracion-dashboard',
  templateUrl: './configuracion-dashboard.component.html',
  styleUrls: ['./configuracion-dashboard.component.css']
})
export class ConfiguracionDashboardComponent implements OnInit {

  routeData = [
    {
      'glosa':'Calendario Académico',
      'path':'calendario',
      'icon':'icon-calendar-o',
    },
    {
      'glosa':'Notas y Ponderaciones',
      'path':'notas',
      'icon':'icon-check-square-o',
    },
    {
      'glosa':'Jornada',
      'path':'jornada',
      'icon':'icon-bell-o',
    },
    {
      'glosa':'Planes de Estudio y Tipos de Enseñanza',
      'path':'planes-ensenanza',
      'icon':'icon-graduation-cap',
    },
    {
      'glosa':'Asignaturas Especiales',
      'path':'asignaturas-especiales',
      'icon':'icon-pencil',
    }
  ];

  routes = [];

  timeoutMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private configuracionService: ConfiguracionService,
  ) { }

  ngOnInit() {
    this.timeoutMessage = connectionErrorMsg();

    this.configuracionService.getConfiguraciones().subscribe(res => {
      this.routes = res;
      for(let r of this.routes){
        let data = this.routeData.find(data => data.glosa == r.glosa);
        r['path'] = data.path;
        r['icon'] = data.icon;
      }
    })
  }

  goToRoute(path: string, id: number){
    if(localStorage.getItem('idConfig')){
      localStorage.setItem('idConfig',id.toString());
    } else {
      localStorage['idConfig'] = id;
    }

    this.router.navigate([`./${path}`],{relativeTo: this.route.parent});
  }

  getColegioId(){
    return JSON.parse(localStorage.getItem('currentUser')).colegioId
  }

}
