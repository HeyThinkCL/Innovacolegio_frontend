import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';
@Injectable()
export class NotasService {
  static get parameters(){
    return [[Http]]
  }

  private notasUrl = globalVar.apiUrl+'/libro_clases/cursos/notas';

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
  getNotasById(id: number): Observable<any> {
    const url = `${this.notasUrl}/${id}?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  updateNota(nota,asignatura_id){
    const url = `${this.notasUrl}/${nota.id}?asignatura_id=${asignatura_id}`;
    let payload = {};
    payload['nota'] = JSON.parse(JSON.stringify(nota));
    payload['colegio_id']=this.getColegioId();

    return this.http.put(url, JSON.stringify(payload), {headers: this.headers})
      .map(() => nota)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createNota(curso_id:number, asignatura_id: number, nota: any){
    let options = new RequestOptions({headers: this.headers});
    let payload = {'nota':{
      'curso_id':curso_id,
      'asignatura_id':asignatura_id,
      'contenido':nota.contenido,
      'fecha':nota.fecha,
      'coeficiente':nota.coeficiente,
      },
      'colegio_id':this.getColegioId(),
    };
    return this.http.post(this.notasUrl, JSON.stringify(payload), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //DELETE
  deleteNotas(notas){

    const url = `${this.notasUrl}/${notas[0]}?nota=${JSON.stringify(notas)}&colegio_id=${this.getColegioId()}`;

    return this.http.delete(url,{headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }


}
