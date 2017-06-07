/**
 * Created by matias on 18-03-17.
 */
import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';

@Injectable()
export class ConfigPlanesGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    return true;
  }

}
