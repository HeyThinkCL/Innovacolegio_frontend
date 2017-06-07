import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class ApoderadosService {
  static get parameters(){
    return [[Http]]
  }

  private apoderadosUrl = globalVar.apiUrl+'/apoderados';

  constructor( private http: Http) { }

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token});

  getColegioId(){
    return JSON.parse(localStorage.getItem('currentUser')).colegioId;
  }
  getUserRol(){
    return JSON.parse(localStorage.getItem('currentUser')).userRol;
  }
  //POST
  createApoderado(alumnoId: number, apoderado: any): Observable<any>{
    apoderado['alumno_id'] = alumnoId;
    return this.http
      .post(this.apoderadosUrl, JSON.stringify({'apoderado':apoderado,'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getApoderadoById(apoderadoId: number): Observable<any>{
    const url = `${this.apoderadosUrl}/${apoderadoId}?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  updateApoderado(alumnoId: number, apoderado: any): Observable<any>{
    apoderado['alumno_id'] = alumnoId;

    const url = `${this.apoderadosUrl}/${apoderado.id}`;
    return this.http
      .put(url, JSON.stringify({'apoderado':apoderado,'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(() => apoderado)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
