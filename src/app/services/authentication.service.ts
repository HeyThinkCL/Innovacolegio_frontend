import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";

import * as globalVars from '../globals';

@Injectable()
export class AuthenticationService {
  static get parameters(){
    return [[Http]]
  }

  private authUrl: string = globalVars.apiUrl+'/authenticate';
  private headers = new Headers({'Content-Type': 'application/json'});

  public token: string;
  public colegioId: number;

  private userRol = [
    {'rol':1,'glosa':'Sostenedor'},
    {'rol':2,'glosa':'Director'},
    {'rol':3,'glosa':'UTP'},
    {'rol':4,'glosa':'Administrador'},
    {'rol':5,'glosa':'Digitador'},
  ];


  constructor(private http: Http) {
    this.http=http;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  login(token: string, userData: any){
    localStorage.clear();
    if(token && userData){
      this.token =JSON.parse(JSON.stringify(token));

      let rolName: string;
      if(this.userRol.find(r => r.rol == +userData.rol)){
        rolName = this.userRol.find(r => r.rol == +userData.rol).glosa;
      } else {
        rolName = '';
      }

      let currentUser = {
        userId:userData.id,
        email: userData.email,
        token: this.token,
        colegioId: userData.colegio_id,
        rol: btoa(btoa(token.substr(0,5)+userData.rol+token.substr(token.length-5,token.length))),
        sesion: rolName,
        nombre: userData.nombre,
        apellido: userData.apellido_paterno,
      };

      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  //POST
  authenticate(user: string, password: string): Observable<any>{
    return this.http.post(this.authUrl,JSON.stringify({'credentials':{'email':user,'password':password}}),{headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status ));
  }


  verifyToken(token: string): Observable<any>{
    let headers = new Headers({'Content-Type': 'application/json','Authorization': token});
    let url = `${globalVars.apiUrl}/verifies`;

    return this.http.get(url,{headers: headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || error.status));
  }

  /*verifyToken(email: string, token: string){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    this.http.get('http://localhost:8080/rest/resource', {
      headers : headers
    })
      .catch(initialError =>{
        if (initialError && initialError.status === 401) {
          this.refresh(email,token).flatMap((accessToken) => {
            // retry with new token
            headers = new Headers();
            headers.append('Authorization', 'Bearer ' +  accessToken);
            return this.http.get('http://localhost:8080/rest/resource', {
              headers : headers });
          });
        } else {
          return Observable.throw(initialError);
        }
      })
      .map(res => res.json())
      .subscribe(
        res => {},
        error => {
          console.log("error="+JSON.stringify(error));
        }
      );
  }*/

  /*refresh(email: string, token: string): Observable<any>{
    console.log("refreshing token");
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return Observable.create(
      observer => {
        this.http.post('http://localhost:8080/oauth/token', JSON.stringify({email:email,token:token}), {
          headers : headers
        })
          .map(res => res.json()).subscribe(
          (data) => {
            let newToken = data.access_token;

            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.token = newToken;
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            observer.next(newToken);
            observer.complete();
          },
          (error) => {
            Observable.throw(error);
          }
        );
      }
    );
  }*/
}

