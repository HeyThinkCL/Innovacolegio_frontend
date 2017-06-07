import { Component, OnInit } from '@angular/core';

import { connectionErrorMsg, emptyArrayMsg } from '../../../spinner/spinner.component'

import {ProfesoresService} from '../../../../services/libros/profesores.service';

@Component({
  selector: 'app-ver-profesores',
  templateUrl: './ver-profesores.component.html',
  styleUrls: ['./ver-profesores.component.css']
})
export class VerProfesoresComponent implements OnInit {

  filterData:string  = '';
  filterKeys = [
    {
      'mainKey':'usuario',
      'subKeys':['nombre','apellido_paterno','apellido_materno','rut']
    }
  ];

  private profesores = [];

  timeoutMessage: string;

  constructor(
    private profesoresService: ProfesoresService
  ) { }

  ngOnInit() {
    this.timeoutMessage = connectionErrorMsg();
    this.profesoresService.getProfesores().subscribe(res => {
      this.profesores = res;
      if((res.length>0)){
        this.timeoutMessage = emptyArrayMsg("Profesores");
      }
    })
  }

}
