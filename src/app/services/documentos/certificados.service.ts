import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class CertificadosService {
  static get parameters(){
    return [[Http]]
  }

  private documentosUrl = globalVar.apiUrl+'/certificados';

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

  generateAlumnoRegular(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };

    return this.http.post(`${this.documentosUrl}/alumnos_regulares`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateMatricula(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };

    return this.http.post(`${this.documentosUrl}/matriculas`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateInscripcion(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };

    return this.http.post(`${this.documentosUrl}/certificado_inscripcions`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateAsistencia(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };

    return this.http.post(`${this.documentosUrl}/certificado_asistencias`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateTraslado(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };

    return this.http.post(`${this.documentosUrl}/certificado_traslados`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }
}
