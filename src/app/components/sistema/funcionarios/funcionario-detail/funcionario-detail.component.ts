import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }       from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import * as globalVars from '../../../../globals';

import {FuncionariosService} from '../../../../services/sistema/funcionarios.service';

@Component({
  selector: 'app-funcionario-detail',
  templateUrl: './funcionario-detail.component.html',
  styleUrls: ['./funcionario-detail.component.css']
})
export class FuncionarioDetailComponent implements OnInit {

  id: number;
  private sub: any;

  private funcionario: any;

  private rolesDocentes = [];
  rolesDocentesCheck: boolean = false;
  private rolesNoDocentes = [];
  rolesNoDocentesCheck: boolean = false;

  public selectRolesDocentesData: Array<Select2OptionData> = [];
  public selectRolesNoDocentesData: Array<Select2OptionData> = [];
  public selectRolesOptions: Select2Options;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private funcionariosService: FuncionariosService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.funcionariosService.getFuncionarioById(this.id).subscribe(res => {
        this.funcionario = res;

        this.setRolesDocentes();
        this.setRolesNoDocentes();
      })
    });

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

  goBack(): void {
    this.location.back();
  }

  goToEdit(){
    this.router.navigate(['./editar',this.id],{relativeTo: this.route.parent});
  }


}
