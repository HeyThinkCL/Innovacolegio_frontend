import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {CursosService} from '../../../../services/libros/cursos.service';

@Component({
  selector: 'app-by-curso',
  templateUrl: './by-curso.component.html',
  styleUrls: ['./by-curso.component.css']
})
export class ByCursoComponent implements OnInit {
  @Input('docs') docs: string[];
  @Output() onSelect = new EventEmitter<any>();

  cursos = [];

  filterData = '';
  filterKeys = [
                {
                  'mainKey':'curso',
                  'subKeys':['grado','curso']
                }
              ];

  public disabledSelect: boolean;
  selected = [];
  selectedHolder = [];

  constructor(
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.disabledSelect = false;
    this.cursosService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    })
  }

  selectCurso(id){
    if (this.include(this.selected,id)){
      this.selected.splice(this.selected.indexOf(id),1);
    } else {
      this.selected = [];
      this.selected.push(id);
    }
    this.emitSelection();
  }

  selectAll(){
    if(!(this.disabledSelect)){
      this.selectedHolder = this.selected;
      let selectedBuffer = [];
      for (let curso of this.cursos){
        selectedBuffer.push(curso.curso.id);
      }
      this.selected = selectedBuffer;
    } else {

      if(this.selectedHolder){
        this.selected = this.selectedHolder;
      } else {
        this.selected = [];
      }

    }
    this.disabledSelect = !(this.disabledSelect);
    this.emitSelection();
  }

  include(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }

  emitSelection(){
    this.onSelect.emit(this.selected);
  }

}
