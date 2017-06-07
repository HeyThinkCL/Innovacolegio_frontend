import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../../globals';

@Injectable()
export class PlanDeEstudiosService {
  static get parameters(){
    return [[Http]]
  }


  private planesDeEstudiosUrl = globalVar.apiUrl+'/configuraciones/plan_estudios';

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
  getPlanesDeEstudio(): Observable<any>{
    return this.http.get(`${this.planesDeEstudiosUrl}?colegio_id=${this.getColegioId()}`,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getConfigPlanesDeEstudio(idConfig: number): Observable<any>{
    return this.http.get(`${this.planesDeEstudiosUrl}/${idConfig}?colegio_id=${this.getColegioId()}`,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getConfigPlanesDeEstudioById(idConfig: number): Observable<any>{
    return this.http.get(`${this.planesDeEstudiosUrl}?id=${idConfig}?colegio_id=${this.getColegioId()}`,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createConfigPlanesDeEstudio(idConfig: number): Observable<any>{
    let url = `${this.planesDeEstudiosUrl}?id=${idConfig}`;

    let payload = {};

    return this.http.post(url, JSON.stringify({'config': payload,'colegio_id': this.getColegioId()}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  updateConfigPlanesDeEstudio(idConfig: number,config: any): Observable<any>{
    let url = `${this.planesDeEstudiosUrl}/${idConfig}`;

    return this.http.put(url, JSON.stringify({'config': config,'colegio_id': this.getColegioId()}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  //creación automática de cursos
  //POST
  createCursosWithConfigPlanesDeEstudio(idConfig:number, configuracion: any): Observable<any>{

    let url = `${globalVar.apiUrl}/configuraciones/cursos?colegio_id=${this.getColegioId()}`;

    return this.http.post(url, JSON.stringify({'config': configuracion,'colegio_id': this.getColegioId()}),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

}
