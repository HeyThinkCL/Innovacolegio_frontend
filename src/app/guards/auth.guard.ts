import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class AuthGuardChild implements CanActivateChild {
  constructor(private router: Router) { }

  canActivateChild() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
