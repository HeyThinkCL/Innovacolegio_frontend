import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class PostulacionesService {
  static get parameters(){
    return [[Http]]
  }

  private alumnosUrl = globalVar.apiUrl+'/alumnos';

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
  createPostulacion(postulacion: any): Observable<any>{
    postulacion['colegio_id']=this.getColegioId();

    return this.http
      .post(this.alumnosUrl, JSON.stringify(postulacion), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getAllPostulaciones(): Observable<any>{
    return this.http.get(`${this.alumnosUrl}?colegio_id=${this.getColegioId()}`,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getPostulaciones(): Observable<any>{
    const url:string = `${this.alumnosUrl}/postulantes?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getAceptadas(): Observable<any>{
    const url:string = `${this.alumnosUrl}/aceptados?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getListaEspera(): Observable<any>{
    const url:string = `${this.alumnosUrl}/lista_espera?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getRechazadas(): Observable<any>{
    const url:string = `${this.alumnosUrl}/rechazados?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getPostulante(postulanteId: any): Observable<any>{
    return this.getAllPostulaciones()
      .map(postulante => postulante.find(postulante => postulante.id == postulanteId));
  }
  //PUT
  updatePostulante(postulante: any): Observable<any>{
    const url = `${this.alumnosUrl}/${postulante.id}`;
    postulante['colegio_id']=this.getColegioId();
    return this.http
      .put(url, JSON.stringify(postulante), {headers: this.headers})
      .map(() => postulante)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
