import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import { Colegio } from '../../components/sistema/colegios/colegio'

import * as globalVar from '../../globals';

@Injectable()
export class ColegiosService {
  static get parameters(){
    return [[Http]]
  }

  private colegiosUrl = globalVar.apiUrl+'/colegios';

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token});

  constructor(private http: Http) {
    this.http=http;
  }

  getColegioId(){
    return JSON.parse(localStorage.getItem('currentUser')).colegioId;
  }
  getUserRol(){
    return JSON.parse(localStorage.getItem('currentUser')).userRol;
  }

  getUserId(){
    return JSON.parse(localStorage.getItem('currentUser')).userId;
  }

  //GET
  getColegios(): Observable<Colegio[]> {
    return this.http.get(`${this.colegiosUrl}?colegio_id=${this.getColegioId()}&user_id=${this.getUserId()}`,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ))
  }

  getColegio(id: number): Observable<Colegio> {
    return this.getColegios()
                .map(colegios => colegios.find(colegio => colegio.id == id));
  }
  //PUT
  updateColegio(colegio: Colegio){
    const url = `${this.colegiosUrl}/${colegio.id}`;
    return this.http.put(url, JSON.stringify(colegio), {headers: this.headers})
      .map(() => colegio)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createColegio(colegio: Colegio): Observable<Colegio>{
    let options = new RequestOptions({headers: this.headers});
    colegio['user_id']=this.getUserId();
    return this.http.post(this.colegiosUrl, JSON.stringify(colegio), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //DELETE
  deleteColegio(id: number): Observable<void>{
    const url = `${this.colegiosUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getAsignaturasByColegioId(): Observable<any>{
    const url = `${this.colegiosUrl}/asignaturas/${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getAsignatura(id): Observable<Colegio>{
    return this.getAsignaturasByColegioId()
      .map(asignaturas => asignaturas.find(asignaturas => asignaturas.id == id));
  }

  updateAsignatura(asignatura: any){
    const url = `${this.colegiosUrl}/asignaturas/${asignatura.id}?colegio_id=${this.getColegioId()}`;
    return this.http.put(url, JSON.stringify(asignatura), {headers: this.headers})
      .map(() => asignatura)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
