import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVar from '../../globals';
@Injectable()
export class EstadosCivilesService {
  static get parameters(){
    return [[Http]]
  }

  private estadosCivilesUrl = globalVar.apiUrl+'/estados_civiles';

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
  getEstadosCiviles(){
    return this.http.get(this.estadosCivilesUrl,{headers:this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }
}
