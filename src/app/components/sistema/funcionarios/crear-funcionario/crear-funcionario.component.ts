import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';
import  { Ng2DatetimePickerComponent } from 'ng2-datetime-picker';

import { EtniasService } from '../../../../services/sistema/etnias.service';
import { EstadosCivilesService } from '../../../../services/sistema/estados-civiles.service';
import { FuncionariosService} from '../../../../services/sistema/funcionarios.service';

import * as globalVars from '../../../../globals';

@Component({
  selector: 'app-crear-funcionario',
  templateUrl: './crear-funcionario.component.html',
  styleUrls: ['./crear-funcionario.component.css']
})
export class CrearFuncionarioComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  //etnias select2
  public selectEtniaData: Array<Select2OptionData> = [];
  public selectEtniaOptions: Select2Options;

  //nacionalidades select2
  public selectNacionalidadData: Array<Select2OptionData> = [];
  public selectNacionalidadOptions: Select2Options;

  //estados civiles select2
  public selectEstadoCivilData: Array<Select2OptionData> = [];
  public selectEstadoCivilOptions: Select2Options;

  public selectRolesDocentesData: Array<Select2OptionData> = [];
  public selectRolesNoDocentesData: Array<Select2OptionData> = [];
  public selectRolesOptions: Select2Options;

  private funcionario = {
    'usuario':{
      'nombre':null,
      'apellido_paterno':null,
      'apellido_materno':null,
      'rut':null,
      'dv':null,
      'fono_casa': null,
      'fono_movil': null,
      'email': null,
      'sexo': null,
      'nacionalidad': null,
      'estado_civil': null,
      'fecha_nacimiento': null,
    },
    'director':false,
    'profesor':false,
    'inspector':false,
    'psicopedagogo':false,
    'digitador':false,
    'jefeUTP':false,
    'secretario':false,
    'asistente':false,
    'horas_profesor':{
      'valor':null,
    },
  };
  private rolesDocentes = [];
  private rolesNoDocentes = [];

  constructor(
    private location: Location,
    private etniasService: EtniasService,
    private estadosCivilesService: EstadosCivilesService,
    private funcionariosService: FuncionariosService,
  ) { }

  ngOnInit() {
    this.selectEtniaData = [{
      id:' ',
      text:'Ninguna'
    }];

    this.etniasService.getEtnias().subscribe(etnias => {
      this.selectEtniaData.pop();
      this.selectEtniaData = [{
        id:' ',
        text:'Ninguna'
      }];
      for (let etnia of etnias){
        this.selectEtniaData.push({
          id: etnia.etnia,
          text: etnia.etnia,
        })
      }
      this.selectEtniaData = JSON.parse(JSON.stringify(this.selectEtniaData));
    });

    this.selectEtniaOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Etnia',
    };

    this.selectEstadoCivilData = [{
      id:' ',
      text:'Ninguno'
    }];

    this.estadosCivilesService.getEstadosCiviles().subscribe(estados => {
      this.selectEstadoCivilData.pop();
      this.selectEstadoCivilData = [{
        id:' ',
        text:'Ninguno'
      }];
      for (let estado of estados){
        this.selectEstadoCivilData.push({
          id: estado.tipo,
          text: estado.tipo,
        })
      }
    });

    this.selectEstadoCivilOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Estado Civil',
    };

    for (let country of globalVars.countriesArray){
      this.selectNacionalidadData.push({
        id:country.nombre,
        text: country.nombre,
      })
    }

    this.selectNacionalidadOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Nacionalidad',
    };

    for (let rol of globalVars.rolesDocentes){
      this.selectRolesDocentesData.push({
        id:rol.rol,
        text: rol.rol,
      })
    }

    for (let rol of globalVars.rolesNoDocentes){
      if(rol.rol != 'director'){
        this.selectRolesNoDocentesData.push({
          id:rol.rol,
          text: rol.rol,
        })
      }

      /*this.selectRolesNoDocentesData.push({
        id:rol.rol,
        text: rol.rol,
      })*/
    }

    this.selectRolesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Roles',
      multiple: true,
      allowClear:true,
    };


  }

  profesorCheck(){
    if(this.rolesDocentes.indexOf('profesor') == -1){
      this.funcionario.horas_profesor = null;
    }
  }

  goBack(): void {
    this.location.back();
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

  saveFuncionario(){
    for(let rol of this.rolesDocentes){
      this.funcionario[rol.toString()] = true;
    }

    for(let rol of this.rolesNoDocentes){
      this.funcionario[rol.toString()] = true;
    }

    this.funcionariosService.createFuncionario(this.funcionario).subscribe(res => {
      this.modalOpen();
    })
  }

}
