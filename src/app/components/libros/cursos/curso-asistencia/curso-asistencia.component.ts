import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curso-asistencia',
  templateUrl: 'curso-asistencia.component.html',
  styleUrls: ['curso-asistencia.component.css']
})
export class CursoAsistenciaComponent implements OnInit {

  private currentTabPath: string = '';
  tabs = [
    {"id":1,"path":'ver',"label":"Ver","icon":"icon-eye"},
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
