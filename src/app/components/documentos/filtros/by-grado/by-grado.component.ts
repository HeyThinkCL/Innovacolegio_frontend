import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

import {CursosService} from '../../../../services/libros/cursos.service';

@Component({
  selector: 'app-by-grado',
  templateUrl: './by-grado.component.html',
  styleUrls: ['./by-grado.component.css']
})
export class ByGradoComponent implements OnInit {
  @Input('docs') docs: string[];
  @Output() onSelect = new EventEmitter<any>();

  public selectData: Array<Select2OptionData>;
  public selectOptions: Select2Options;
  public disabledSelect: boolean;
  public selectValue = [];
  selected: any;
  selectedHolder: any;

  private grados = [];

  constructor(
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.cursosService.getCursos().subscribe(cursos => {
      for(let c of cursos){
        if(this.grados.length<1 || this.grados.indexOf(c.curso.grado)==-1){
          this.grados.push(c.curso.grado);
        }
      }
      this.selectData = [];
      for(let grado of this.grados){
        this.selectData.push({
          id: grado,
          text: grado
        })
      }
    });

    this.selectOptions = {
      multiple: true,
      closeOnSelect: false,
      placeholder: 'Seleccione Nivel',
      allowClear: true,
    };

    this.disabledSelect = false;
  }

  selectAll(){
    if(!(this.disabledSelect)){
      this.selectedHolder = this.selected;
      let selectedBuffer = [];
      for (let option of this.selectData){
        if(!(option.id==' ')){
          selectedBuffer.push(option.id);
        }

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

  selectChanged(e: any){
    this.selected = e.value;
    this.emitSelection();
  }

  emitSelection(){
    this.onSelect.emit(this.selected);
  }
}
