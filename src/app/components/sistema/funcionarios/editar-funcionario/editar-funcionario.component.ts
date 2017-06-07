import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';
import  { Ng2DatetimePickerComponent } from 'ng2-datetime-picker';

import { EtniasService } from '../../../../services/sistema/etnias.service';
import { EstadosCivilesService } from '../../../../services/sistema/estados-civiles.service';

import {FuncionariosService} from '../../../../services/sistema/funcionarios.service';

import * as globalVars from '../../../../globals';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css']
})
export class EditarFuncionarioComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  //nacionalidades select2
  public selectNacionalidadData: Array<Select2OptionData> = [];
  public selectNacionalidadOptions: Select2Options;

  //estados civiles select2
  public selectEstadoCivilData: Array<Select2OptionData> = [];
  public selectEstadoCivilOptions: Select2Options;

  public selectRolesDocentesData: Array<Select2OptionData> = [];
  public selectRolesNoDocentesData: Array<Select2OptionData> = [];
  public selectRolesOptions: Select2Options;

  private selectedFuncionario: any;
  private funcionario: any;

  private rolesDocentes = [];
  rolesDocentesCheck: boolean = false;
  private rolesNoDocentes = [];
  rolesNoDocentesCheck: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private estadosCivilesService: EstadosCivilesService,
    private funcionariosService: FuncionariosService,
  ) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.funcionariosService.getFuncionarioById(this.id).subscribe(res => {
        if(!res.horas_profesor){
          res['horas_profesor'] = null;
        }

        this.funcionario = res;

        this.selectedFuncionario = JSON.parse(JSON.stringify(res));
        this.setRolesDocentes();
        this.setRolesNoDocentes();
      })
    });

    this.estadosCivilesService.getEstadosCiviles().subscribe(estados => {
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
      this.selectRolesNoDocentesData.push({
        id:rol.rol,
        text: rol.rol,
      })
    }

    this.selectRolesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Roles',
      multiple: true,
      allowClear: true,
    };

  }

  setRolesDocentes(){
    let roles = ['profesor','jefeUTP','asistente'];
    for(let rol of roles){
      if(this.funcionario[rol.toString()]){
        this.rolesDocentes.push(rol);
      }
    }
    this.rolesDocentesCheck = true;
  }

  setRolesNoDocentes(){
    let roles = ['director','inspector','psicopedagogo','secretario','digitador'];
    for(let rol of roles){
      if(this.funcionario[rol.toString()]){
        this.rolesNoDocentes.push(rol);
      }
    }
    this.rolesNoDocentesCheck = true;
  }

  rolDocenteChange(e: any){
    this.rolesDocentes = e;
    return;
  }

  rolNoDocenteChange(e: any){
    this.rolesNoDocentes = e;
    return;
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
    for(let key in this.funcionario){
      if(typeof this.funcionario[key.toString()] === "boolean" || this.funcionario[key.toString()] instanceof Boolean){
        this.funcionario[key.toString()] = false;
      }
    }
    if(this.rolesDocentes && this.rolesDocentes.length>0){
      for(let rol of this.rolesDocentes){
        this.funcionario[rol.toString()] = true;
      }
    }
    if(this.rolesNoDocentes && this.rolesNoDocentes.length>0){
      for(let rol of this.rolesNoDocentes){
        this.funcionario[rol.toString()] = true;
      }
    }

    this.funcionariosService.updateFuncionario(this.funcionario).subscribe(res => {
      this.modalOpen();
    });
  }
}
