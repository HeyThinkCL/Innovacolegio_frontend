import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/pairwise';

import {AuthenticationService} from './services/authentication.service';
import {RedirectService} from './services/redirect.service'
import {ConfiguracionService} from './services/sistema/configuracion.service';
import {ColegiosService} from './services/sistema/colegios.service';

import * as globalVars from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  /*@HostListener('window:unload',['$event'])
  beforeunloadHandler(event) {
    this.logout();
  } use when js reload is solved */

  private currentUser;
  private colegios = [];
  private colegioName: string;
  private colegioImg: string;

  configRoutes = [];
  configRoutesData = [
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

  version: string;

  constructor(
    private configuracionService: ConfiguracionService,
    private colegiosService: ColegiosService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private redirectService: RedirectService,
  ){}

  ngOnInit(){

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.version = globalVars.version;

    this.colegiosService.getColegios().subscribe(res => {
      if(res){
        if(res instanceof Array){
          this.colegios = res;
          this.colegioName = this.colegios.find(c => c.id == this.currentUser.colegioId)? this.colegios.find(c => c.id == this.currentUser.colegioId).nombre:'';
          this.colegioImg = this.colegios.find(c => c.id == this.currentUser.colegioId)? this.colegios.find(c => c.id == this.currentUser.colegioId).img:'';
        } else {
          let colegio: any = res;
          this.colegioName = colegio.nombre;
          this.colegioImg = colegio.img;
        }

      }
    }, error => {
      if(error==500){
        this.redirectService.onServerError500();
      }
    });

    this.configuracionService.getConfiguraciones().subscribe(res => {
      this.configRoutes = res;
      for(let r of this.configRoutes){
        let data = this.configRoutesData.find(data => data.glosa == r.glosa);
        r['path'] = data.path;
        r['icon'] = data.icon;
      }
    }, error => {
      if(error==500) {
        this.redirectService.onServerError500();
      }
    });
  }


  goToConfigRoute(id: number){
    if(localStorage.getItem('idConfig')){
      localStorage.setItem('idConfig',id.toString());
    } else {
      localStorage['idConfig'] = id;
    }

  }

  getColegioId(){
    return JSON.parse(localStorage.getItem('currentUser')).colegioId
  }

  //currentUser
  getUserRol(){
    return +atob(atob(this.currentUser.rol))[5];
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['../login'])
  }
}
