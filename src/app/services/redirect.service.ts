import { Injectable } from '@angular/core';
import {Router} from '@angular/router'

@Injectable()
export class RedirectService {

  constructor(
    private router: Router,
  ) { }

  onServerError500(){
    this.router.navigate(['app/500'])
  }

}
