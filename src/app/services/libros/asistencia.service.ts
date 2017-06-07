import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class AsistenciaService {
  static get parameters(){
    return [[Http]]
  }

  private asistenciaUrl = globalVar.apiUrl+'/libro_clases/cursos/asistencias';

  constructor(private http: Http) {

    this.http=http;
  }

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token});

  getColegioId(){
    return JSON.parse(localStorage.getItem('currentUser')).colegioId;
  }
  getUserRol(){
    return JSON.parse(localStorage.getItem('currentUser')).userRol;
  }

  //GET
  getInasistenciasByMonth(idCurso: number, day: Date){
    const url = `${this.asistenciaUrl}?anno=${day.getFullYear()}&mes=${day.getMonth()+1}&curso_id=${idCurso}`;
    return this.http.get(`${url}&colegio_id=${this.getColegioId()}`, {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  //POST
  updateInasistencia(payload: any, cursoId: number){
    payload['curso_id'] = cursoId;
    return this.http
      .post(this.asistenciaUrl, JSON.stringify({'asistencias':payload,'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(() => {})
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

}
