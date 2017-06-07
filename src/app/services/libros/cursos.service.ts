import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import { Curso } from '../../components/libros/cursos/curso';

import * as globalVar from '../../globals';

@Injectable()
export class CursosService {
  static get parameters(){
    return [[Http]]
  }

  private cursosUrl = globalVar.apiUrl+'/libro_clases/cursos';

  constructor(private http: Http) {

    this.http=http;
  }

  private token = JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new Headers({'Content-Type': 'application/json','Authorization': this.token});

  getColegioId(){
    return JSON.parse(localStorage.getItem('currentUser')).colegioId;
  }
  getUserRol(){
    return JSON.parse(localStorage.getItem('currentUser')).rol;
  }
  //GET
  getCursos(): Observable<any> {
    return this.http.get(`${this.cursosUrl}?colegio_id=${this.getColegioId()}`,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getCurso(id: number): Observable<any> {
    return this.getCursos()
      .map(cursos => cursos.find(curso => curso.curso.id == id));
  }
  //GET
  getCursoById(id): Observable<any> {
    const url = `${this.cursosUrl}/${id}?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getAsignaturasByCursoId(id): Observable<any> {
    const url = `${this.cursosUrl}/asignaturas/${id}?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getNotasAlumnosByCursoId(id,asignatura): Observable<any> {
    const url = `${this.cursosUrl}/notas/${id}?asignatura_id=${asignatura}&colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  updateCurso(curso: Curso){
    const url = `${this.cursosUrl}/${curso.id}`;
    let payload = {};
    payload['curso'] = JSON.parse(JSON.stringify(curso));
    payload['colegio_id']=this.getColegioId();

    return this.http.put(url, JSON.stringify(payload), {headers: this.headers})
      .map(() => curso)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createCurso(curso: Curso): Observable<any>{
    let options = new RequestOptions({headers: this.headers});
    curso['colegio_id'] = this.getColegioId();

    return this.http.post(this.cursosUrl, JSON.stringify({'curso':curso}), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
      // .catch((error:any) => Observable.throw(error.json().error || 'Server Error: Couldn\'t CREATE Curso'));
  }
  //DELETE
  deleteCurso(id: number): Observable<void>{
    const url = `${this.cursosUrl}/${id}?colegio_id=${this.getColegioId()}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //GET
  getAnotacionesGenerales(id: number): Observable<any>{
    const url = `${this.cursosUrl}/anotaciones?id=${id}&colegio_id=${this.getColegioId()}`;

    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  asignarAlumnoACurso(cursoId: number, alumnoId: number): Observable<any>{
    let payload = {};
    payload['curso']={
      'curso_id':cursoId,
      'alumno_id':alumnoId,
    };
    payload['colegio_id']=this.getColegioId();

    const url = `${this.cursosUrl}/alumnos`;

    return this.http
      .post(url, JSON.stringify(payload), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  updateAsignaturasByCursoId(cursoId: number, asignaturas){
    const url = `${this.cursosUrl}/asignaturas/${cursoId}`;
    let payload = {};
    payload['asignaturas'] = JSON.parse(JSON.stringify(asignaturas));
    payload['colegio_id']=this.getColegioId();

    return this.http.put(url, JSON.stringify(payload), {headers: this.headers})
      .map(() => asignaturas)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //DELETE
  deleteAsignaturaById(asignaturaId: number,cursoId: number): Observable<void>{
    const url = `${this.cursosUrl}/asignaturas/${cursoId}?asignatura_id=${asignaturaId}&colegio_id=${this.getColegioId()}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  prepareCurso(cursoId: number): Observable<any>{
    const url = `${this.cursosUrl}/listas/${cursoId}?colegio_id=${this.getColegioId()}`;
    let payload = {};
    return this.http.put(url,JSON.stringify(payload), {headers: this.headers})
      .map(()=> null )
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  ////Electivos

  //GET
  getElectivoById(electivoId: number){
    let url = `${this.cursosUrl}/electivos/asignaturas/${electivoId}?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  //POST
  createElectivo(electivo, cursos: any[]): Observable<any>{
    let payload = {
      'electivo':electivo,
      'cursos':cursos,
      'colegio_id':this.getColegioId(),
    };

    let url = `${this.cursosUrl}/electivos/asignaturas`;
    return this.http.post(url, JSON.stringify(payload), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  //POST
  addAlumnosToElectivo(asignaturaId,alumnos: any[]): Observable<any>{
    let payload = {
      'asignatura_id':asignaturaId,
      'alumnos':alumnos,
      'colegio_id':this.getColegioId(),
    };

    let url = `${this.cursosUrl}/electivos/alumnos`;
    return this.http.post(url, JSON.stringify(payload), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  //PUT
  updateElectivo(asignaturaId: number, selectedAlumnos: number[], sacarAlumnos: number[]){
    let payload = {
      'id':asignaturaId,
      'alumnos':selectedAlumnos,
      'alumnos_out':sacarAlumnos,
      'colegio_id':this.getColegioId(),
    };

    let url = `${this.cursosUrl}/electivos/alumnos/${asignaturaId}`;
    return this.http.put(url, JSON.stringify(payload), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  //GET
  getNotasAlumnosByElectivoId(id,asignatura): Observable<any> {
    const url = `${this.cursosUrl}/electivos/notas/${id}?asignatura_id=${asignatura}&colegio_id=${this.getColegioId()}`;
    return this.http.get(url, {headers: this.headers})
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error.status));
  }

  //POST
  createElectivoNota(curso_id:number, asignatura_id: number, nota: any){
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
    return this.http.post(`${this.cursosUrl}/electivos/notas`, JSON.stringify(payload), options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
