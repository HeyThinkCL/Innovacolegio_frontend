import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import { ColegiosService } from '../../../../services/sistema/colegios.service';
import { DpaService } from '../../../../services/sistema/dpa.service';

import { EtniasService } from '../../../../services/sistema/etnias.service';
import { EstadosCivilesService } from '../../../../services/sistema/estados-civiles.service';
import { FuncionariosService} from '../../../../services/sistema/funcionarios.service';

import * as globalVars from '../../../../globals';

@Component({
  selector: 'app-crear-colegio',
  templateUrl: 'crear-colegio.component.html',
  styleUrls: ['crear-colegio.component.css']
})
export class CrearColegioComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  colegio: any;

  regiones = [];
  provincias = [];
  comunas = [];

  selectedRegion: any;
  selectedProvincia: any;
  selectedComuna: any;

  //etnias select2
  public selectEtniaData: Array<Select2OptionData> = [];
  public selectEtniaOptions: Select2Options;

  //nacionalidades select2
  public selectNacionalidadData: Array<Select2OptionData> = [];
  public selectNacionalidadOptions: Select2Options;

  //estados civiles select2
  public selectEstadoCivilData: Array<Select2OptionData> = [];
  public selectEstadoCivilOptions: Select2Options;

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


  constructor(
      private location: Location,
      private colegiosService: ColegiosService,
      private dpaService: DpaService,
      private etniasService: EtniasService,
      private estadosCivilesService: EstadosCivilesService,
      private funcionariosService: FuncionariosService,
  ) { }

  ngOnInit() {
    this.colegio = {
      "id": 1,
      "nombre": null,
      "razon_social": null,
      "resolucion": null,
      "dependencia": null,
      "rut": null,
      "dv":null,
      "rbd": null,
      "area": null,
      "direccion": null,
      "numeracion": null,
      "comuna": null,
      "region": null,
      "provincia": null,
      "localidad": null,
      "telefono": null,
      "celular": null,
      "mail": null,
      "web": null,
      "fax": null,
      "director": null,
      "sostenedor": null,
      "depto_prov": null,
      'plan_estudios': [],
    };

    this.dpaService.getRegiones().subscribe(res => {
      this.regiones = res;
    });

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

  }

  setRegion(region: string){
    this.colegio.provincia = null;
    this.colegio.comuna = null;
    this.colegio.depto_prov = null;
    this.selectedRegion = this.regiones.find(reg => reg.nombre == region);
    this.dpaService.getProvinciasByRegionId(this.selectedRegion.codigo).subscribe(res => {
      this.provincias = res;
    });
  };

  setProvincia(provincia: string){
    this.colegio.comuna = null;
    this.colegio.depto_prov = null;
    this.selectedProvincia = this.provincias.find(prov => prov.nombre == provincia);
    this.dpaService.getComunasByProvinciaIdRegionId(this.selectedProvincia.codigo).subscribe(res => {
      this.comunas = res;
    });
  };

  setComuna(comuna: string){
    this.selectedComuna = this.comunas.find(com => com.nombre == comuna);
    this.dpaService.getDeptoProvincialbyComunaId(this.selectedComuna.codigo).subscribe(res => {
      this.colegio.depto_prov = res.depto_prov;
    });
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

  imgUpload(e){
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file){
      reader.readAsDataURL(file);
      reader.onload = (e) => {

        this.colegio.img=reader.result;
      }
    }
  }

  lock(){
    if(!this.colegio.name){
      return true;
    }
    if(!this.colegio.rbn){
      return true;
    }
    if(!this.colegio.region){
      return true;
    }
    if(!this.colegio.provincia){
      return true;
    }
    if(!this.colegio.comuna){
      return true;
    }
    if(!this.colegio.depto_prov){
      return true;
    }

    return false;
  }

  saveColegio(): void {
    this.colegiosService.createColegio(this.colegio).subscribe(res => {
      this.colegio = res;
      this.funcionario.director = true;
      if(this.funcionario.usuario.rut){
        this.funcionariosService.createFuncionario(this.funcionario,this.colegio.id).subscribe(funcionario => {
          this.modalOpen();
        });
      } else {
        this.modalOpen()
      }
    });
  }

}
