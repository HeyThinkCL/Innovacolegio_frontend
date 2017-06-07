import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';

import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';
import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';

@Component({
  selector: 'app-by-tipo-ensenanza',
  templateUrl: './by-tipo-ensenanza.component.html',
  styleUrls: ['./by-tipo-ensenanza.component.css']
})
export class ByTipoEnsenanzaComponent implements OnInit {
  @Input('docs') docs: string[];
  @Output() onSelect = new EventEmitter<any>();

  public selectData: Array<Select2OptionData>;
  public selectOptions: Select2Options;
  public disabledSelect: boolean;
  public selectValue = [];
  selected: any;
  selectedHolder: any;

  private planesDeEstudio = [];
  private tiposDeEnsenanza = [];

  constructor(
    private planDeEStudiosService: PlanDeEstudiosService,
    private configuracionService: ConfiguracionService,
  ) { }

  ngOnInit() {

    this.configuracionService.getConfiguraciones().subscribe(configs => {
      let configId = configs.find(c => c.glosa == 'Planes de Estudio y Tipos de Enseñanza' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId ).id;

      this.planDeEStudiosService.getConfigPlanesDeEstudio(configId).subscribe(res => {
        this.planesDeEstudio = res.planes;

        this.selectData = [];
        for(let plan of this.planesDeEstudio){
          for(let tipo of plan.tipos){
            this.selectData.push({
              id:tipo.tipo.id,
              text:tipo.tipo.glosa
            })
          }
        }
      });
    });

    this.selectOptions = {
      multiple: true,
      closeOnSelect: false,
      placeholder: 'Seleccione Tipo de Enseñanza',
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
