import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading:boolean = false;
  error: string = '';


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
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
    this.authenticationService.logout();
  }

  login(){
    this.loading = true;
    this.error='';
    this.authenticationService.authenticate(this.model.user,this.model.password).subscribe(response => {

      let token = response.auth_token;

      if (token && response.usuario){
        this.authenticationService.verifyToken(token).subscribe(verification_response => {
          if(verification_response){
            if(this.authenticationService.login(token,response.usuario)){
              let currentUser = JSON.parse(localStorage.getItem('currentUser'));

              if(+atob(atob(currentUser.rol))[5]==1){
                this.router.navigate(['after']);
              } else {
                this.router.navigate(['/']);
              }
            }
          }
        }, error => {
          if(error && (error===401 || error==='Not Authorized')){
            this.login();
          }
        });
      } else {
        this.error = 'Usuario o contraseña incorrectos';
        this.loading = false;
      }
    }, error => {
      this.error = 'Usuario o contraseña incorrectos';
      this.loading = false;
    });
  }

}
