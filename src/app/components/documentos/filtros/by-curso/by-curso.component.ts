import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {trigger,state,style,animate,transition} from '@angular/animations';

import {CursosService} from '../../../../services/libros/cursos.service';

@Component({
  selector: 'app-by-curso',
  templateUrl: './by-curso.component.html',
  styleUrls: ['./by-curso.component.css'],
  animations: [
    trigger(
      'collapse', [
        transition(':enter', [
          style({height: '*', opacity: 0}),
          animate('150ms', style({height: 0, opacity: 1}))
        ]),
        transition(':leave', [
          style({height: 0, 'opacity': 1}),
          animate('150ms', style({height: '*', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'fade', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('150ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'shrink', [
        transition(':enter', [
          style({transform: 'scale(0) ', opacity: 0}),
          animate('150ms', style({transform: 'scale(1)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'scale(1)', 'opacity': 1}),
          animate('150ms', style({transform: 'scale(0)', opacity: 0}))
        ])
      ]
    )
  ],
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
  filterSelected = [];

  public disabledSelect: boolean;
  public collapse: boolean;
  selected = [];
  selectedHolder = [];

  constructor(
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.disabledSelect = false;
    this.collapse = false;
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

  filterBySelection(){
    if(this.filterSelected.length>0){
      this.filterSelected = [];
    } else {
      this.filterSelected = JSON.parse(JSON.stringify(this.selected));
    }
  }

}
