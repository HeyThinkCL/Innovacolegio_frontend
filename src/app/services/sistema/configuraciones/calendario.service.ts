import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../../globals';

@Injectable()
export class CalendarioService {
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
  getConfigCalendarioAcademico(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academicos/${idConfig}?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getConfigCalendarioAcademicoById(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academicos?id=${idConfig}&colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createConfigCalendarioAcademico(idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academicos?id=${idConfig}`;

    let payload = {
      'periodo_academico':{
        'glosa':'',
        'fecha_inicio':null,
        'fecha_termino':null,
      },
      'vacaciones':[
        {
          'glosa':'',
          'fecha_inicio':null,
          'fecha_termino':null,
        }
      ],
      'fechas_especiales':[
        {
          'glosa':'',
          'fecha_inicio':null,
          'fecha_termino':null,
        }
      ]
    };

    return this.http.post(url, JSON.stringify({'calendario': payload,'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createEventCalendarioAcademico(vacaciones: boolean, idConfig: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academico/eventos`;

    let payload = {
      'id_config':idConfig,
      'vacaciones':vacaciones,
      'glosa':'',
      'fecha_inicio':null,
      'fecha_termino':null,
    };

    return this.http.post(url, JSON.stringify({'evento': payload, 'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  updateConfigCalendarioAcademico(idConfig: number,config: any): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academicos/${idConfig}`;

    return this.http.put(url, JSON.stringify({'calendario': config,'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //DELETE
  deleteEventCalendarioAcademico(idEvent: number): Observable<any>{
    let url = `${this.configuracionUrl}/configuraciones/calendario_academico/eventos/${idEvent}?colegio_id=${this.getColegioId()}`;

    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }



}
