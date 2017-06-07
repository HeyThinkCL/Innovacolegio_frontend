import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../../globals';
@Injectable()
export class ConfigNotasService {
  static get parameters(){
    return [[Http]]
  }

  private configuracionUrl = globalVar.apiUrl;

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
  getConfigNotas(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas_ponderaciones/${idConfig}?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getConfigNotasById(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas_ponderaciones?id=${idConfig}&colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createConfigNotas(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas_ponderaciones?id=${idConfig}`;

    let payload = {
      'notas':{
        'decimales':null,
        'aprox':null, // 1->aprox. hacia arriba, 0->truncado
      },
      'escalas':''
    };

    return this.http.post(url, JSON.stringify({'notas': payload.notas,'escalas':payload.escalas,'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  updateConfigNotas(idConfig: number,config: any): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/notas_ponderaciones/${idConfig}`;

    return this.http.put(url, JSON.stringify({'notas': config.notas,'escalas':config.escalas,'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
