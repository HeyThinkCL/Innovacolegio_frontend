import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../globals';

@Injectable()
export class DashboardService {
  static get parameters(){
    return [[Http]]
  }

  private dashboardUrl = globalVar.apiUrl+'/dashboard';

  constructor( private http: Http) { }

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token});

  getColegioId(){
    return JSON.parse(localStorage.getItem('currentUser')).colegioId;
  }
  getUserRol(){
    return JSON.parse(localStorage.getItem('currentUser')).userRol;
  }

  //GET
  getAsistenciasColegio(): Observable<any>{
    return this.http.get(`${this.dashboardUrl}/asistencias?colegio_id=${this.getColegioId()}`,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ))
  }

}
