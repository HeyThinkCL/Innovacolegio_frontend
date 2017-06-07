import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class ProfesoresService {
  static get parameters(){
    return [[Http]]
  }

  private profesorsUrl = globalVar.apiUrl+'/profesores';

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
  getProfesores(): Observable<any> {
    return this.http.get(`${this.profesorsUrl}?colegio_id=${this.getColegioId()}`,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getProfesor(id: number): Observable<any> {
    return this.getProfesores()
      .map(profesors => profesors.find(profesor => profesor.id == id));
  }
  //GET
  getProfesorById(id: number): Observable<any> {
    const url = `${this.profesorsUrl}/${id}?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createProfesor(profesor: any): Observable<any>{
    let options = new RequestOptions({headers: this.headers});
    profesor['colegio_id']=this.getColegioId();
    return this.http.post(this.profesorsUrl, JSON.stringify(profesor), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getAsignaturasByProfesorId(profesorId: number): Observable<any>{
    const url = `${this.profesorsUrl}/asignaturas?id=${profesorId}&colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getJefaturasByProfesorId(profesorId: number): Observable<any>{
    const url = `${this.profesorsUrl}/cursos?id=${profesorId}&colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  asignarJefaturasByProfesorId(profesorId: number, cursos){
    const url = `${this.profesorsUrl}/cursos/${profesorId}`;
    let payload = {
      'cursos':cursos,
      'colegio_id':this.getColegioId()
    };

    return this.http.put(url, JSON.stringify(payload), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  asignarAsignaturasByProfesorId(profesorId: number, asignaturas){
    const url = `${this.profesorsUrl}/asignaturas?id=${profesorId}`;
    let payload = {
      'asignaturas':asignaturas,
      'colegio_id':this.getColegioId()
    };

    return this.http.post(url, JSON.stringify(payload), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
