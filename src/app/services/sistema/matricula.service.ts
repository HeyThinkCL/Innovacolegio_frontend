import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class MatriculaService {
  static get parameters(){
    return [[Http]]
  }

  private matriculasUrl = globalVar.apiUrl+'/alumnos';

  constructor( private http: Http) { }

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token});

  getColegioId(){
    return JSON.parse(localStorage.getItem('currentUser')).colegioId;
  }
  getUserRol(){
    return JSON.parse(localStorage.getItem('currentUser')).userRol;
  }

  //GET
  getMatriculas(): Observable<any[]> {
    const url = `${this.matriculasUrl}/matriculados?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getMatricula(id: number): Observable<any> {
    return this.getMatriculas()
      .map(matricula => matricula.find(matricula => matricula.id == id));
  }
  //PUT
  updateMatricula(matricula: any){
    const url = `${this.matriculasUrl}/${matricula.id}`;
    matricula['colegio_id']=this.getColegioId();
    return this.http
      .put(url, JSON.stringify(matricula), {headers: this.headers})
      .map(() => matricula)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createMatricula(matricula: any, cursoId: number): Observable<any> {
    let url = `${this.matriculasUrl}?curso_id=${cursoId}`;
    return this.http
      .post(url, JSON.stringify({'nombre': matricula.nombre,'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(res => res.json().data)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //DELETE
  deleteMatricula(id: number): Observable<any> {
    const url = `${this.matriculasUrl}/${id}?colegio_id=${this.getColegioId()}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));

  }
  //GET
  getAnotacionesById(alumnoId: number, cursoId: number): Observable<any> {
    const url = `${this.matriculasUrl}/${alumnoId}/anotaciones_alumno?curso_id=${cursoId}&colegio_id=${this.getColegioId()}`;

    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

}
