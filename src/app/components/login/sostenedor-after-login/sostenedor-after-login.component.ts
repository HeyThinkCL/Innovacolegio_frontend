import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Observable} from "rxjs/Observable";

import {AuthenticationService} from '../../../services/authentication.service';
import { ColegiosService } from '../../../services/sistema/colegios.service'

@Component({
  selector: 'app-sostenedor-after-login',
  templateUrl: './sostenedor-after-login.component.html',
  styleUrls: ['./sostenedor-after-login.component.css']
})
export class SostenedorAfterLoginComponent implements OnInit {

  private colegios = [];

  constructor(private router: Router,private colegiosService: ColegiosService,) {
    //find better way to reload js
    this.router.events.filter(e => e instanceof NavigationEnd)
      .pairwise().subscribe((e) => {

      for(let event of e){
        if(event instanceof NavigationEnd){
          if(event.urlAfterRedirects=='/app/dashboard'){
            window.location.reload(true);
          }
        }

      }
    });
  }

  ngOnInit() {

    this.colegiosService.getColegios()
      .catch(initError => {
        if(initError && initError.satus==401){
          //refresh token && retry request (return this.colegioService.getcolegios())
          return Observable.throw(initError);
        } else {
          return Observable.throw(initError);
        }
      })
      .subscribe((response) => {
      console.log(response);
      if(response && response.length>0){
        this.colegios = response;
      } else {
        this.router.navigate(['app/sistema/colegios/crear']);
      }

    }, error => {

    });
  }

  goToDashboard(){
    this.router.navigate(['/']);
  }

  selectColegio(colegioId: number){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.colegioId = colegioId;
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.goToDashboard();
  }

}
