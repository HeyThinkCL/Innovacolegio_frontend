import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class InformesService {
  static get parameters(){
    return [[Http]]
  }

  private documentosUrl = globalVar.apiUrl+'/informes';

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

  generateInformeNotas(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };

    return this.http.post(`${this.documentosUrl}/notas`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateListaDeCurso(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };

    return this.http.post(`${this.documentosUrl}/lista_alumnos`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateInasistenciaCurso(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };

    return this.http.post(`${this.documentosUrl}/inasistencia_cursos`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateResumenCurso(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };

    return this.http.post(`${this.documentosUrl}/resumen_cursos`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateAsistenciaColegio(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };
    return this.http.post(`${this.documentosUrl}/asistencia_colegios`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateInformeExtranjeros(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };
    return this.http.post(`${this.documentosUrl}/extranjeros`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  generateInformeIndigenas(idFilter: number, subjects: any[]){
    let payload = {
      'filtro': {
        'id': idFilter,
        'sujetos': subjects,
      },
      'colegio_id':this.getColegioId(),
    };
    return this.http.post(`${this.documentosUrl}/etnias`, JSON.stringify(payload),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

}
