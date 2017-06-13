import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curso-anotaciones',
  templateUrl: 'curso-anotaciones.component.html',
  styleUrls: ['curso-anotaciones.component.css']
})
export class CursoAnotacionesComponent implements OnInit {

  public currentTabPath: string = '';
  tabs = [
    {"id":1,"path":'ver',"label":"Ver","icon":"icon-user"},
    {"id":3,"path":'general',"label":"Ver Generales","icon":"icon-users"},
    {"id":2,"path":'ingresar',"label":"Ingresar","icon":"icon-plus"},
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.router.events.subscribe((res) => {
        this.currentTabPath = this.route.children[0].toString();
      }
    )
  }

  ngOnInit() { }


}
