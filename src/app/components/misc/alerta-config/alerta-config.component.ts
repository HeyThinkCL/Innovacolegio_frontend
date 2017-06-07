import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-alerta-config',
  templateUrl: './alerta-config.component.html',
  styleUrls: ['./alerta-config.component.css']
})
export class AlertaConfigComponent implements OnInit {
  id: number;
  private sub: any;

  configName: string;

  configs = [
    {'id':1,'name':'Calendario Académico'},
    {'id':2,'name':'Notas y Ponderaciones'},
    {'id':3,'name':'Planes de Estudio y Tipos de Enseñanza'},
  ];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.configName = this.configs.find(c => c.id == this.id).name;
    });
  }

}
