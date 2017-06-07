/**
 * Created by matias on 21-04-17.
 */
import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';

@Injectable()
export class ScriptsGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate() {
    return true;
  }
}

@Injectable()
export class ScriptsGuardChild implements CanActivateChild {

  constructor(private router: Router){}

  canActivateChild() {
    return true;
  }
}
