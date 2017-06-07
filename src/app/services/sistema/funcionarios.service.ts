import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';

@Injectable()
export class FuncionariosService {
  static get parameters(){
    return [[Http]]
  }

  private funcionariosUrl = globalVar.apiUrl+'/funcionarios';

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
  getFuncionarios(): Observable<any>{
    return this.http.get(`${this.funcionariosUrl}?colegio_id=${this.getColegioId()}`,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }

  getFuncionario(id: number): Observable<any>{
    return this.getFuncionarios()
      .map(funcionario => funcionario.find(func => func.id == id));
  }
  //GET
  getFuncionarioById(id: number){
    const url = `${this.funcionariosUrl}/${id}?colegio_id=${this.getColegioId()}`;
    return this.http.get(url,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //POST
  createFuncionario(funcionario: any, colegioId = this.getColegioId() ): Observable<any>{

    return this.http
      .post(this.funcionariosUrl, JSON.stringify({'funcionario':funcionario,'colegio_id':colegioId}), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //PUT
  updateFuncionario(funcionario){
    const url = `${this.funcionariosUrl}/${funcionario.id}`;
    return this.http
      .put(url, JSON.stringify({'funcionario':funcionario,'colegio_id':this.getColegioId()}), {headers: this.headers})
      .map(() => funcionario)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
  //DELETE
  deleteFuncionario(id: number){
    const url = `${this.funcionariosUrl}/${id}?colegio_id=${this.getColegioId()}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
