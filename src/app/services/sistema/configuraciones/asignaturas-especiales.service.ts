import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../../globals';

@Injectable()
export class AsignaturasEspecialesService {
  static get parameters(){
    return [[Http]]
  }

  private asignaturasEspecialesUrl = globalVar.apiUrl+'/configuraciones/asignaturas';

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

  //POST
  createAsignaturaEspecial(payload,idConfig: number): Observable<any>{
    let url = `${this.asignaturasEspecialesUrl}`;
    payload['colegio_id'] = this.getColegioId();
    return this.http.post(url,JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  //DELETE
  deleteAsignaturaEspecial(asignaturas_id): Observable<any>{
    let url = `${this.asignaturasEspecialesUrl}/${this.getColegioId()}?asignaturas=${JSON.stringify(asignaturas_id)}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));

  }
}
