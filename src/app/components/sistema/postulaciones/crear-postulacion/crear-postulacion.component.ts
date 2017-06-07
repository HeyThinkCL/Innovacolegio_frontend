import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';
import  { Ng2DatetimePickerComponent } from 'ng2-datetime-picker';

import { PostulacionesService } from '../../../../services/sistema/postulaciones.service'
import { ApoderadosService } from '../../../../services/sistema/apoderados.service'
import { EtniasService } from '../../../../services/sistema/etnias.service'
import { EstadosCivilesService } from '../../../../services/sistema/estados-civiles.service';
import { CursosService } from '../../../../services/libros/cursos.service';

import * as globalVars from '../../../../globals';

@Component({
  selector: 'app-crear-postulacion',
  templateUrl: 'crear-postulacion.component.html',
  styleUrls: ['crear-postulacion.component.css'],
  animations: [
    trigger(
      'fade', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', 'opacity': 1}),
          animate('150ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})

export class CrearPostulacionComponent implements OnInit {
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

  private grados = [];

  private postulante: Postulante;
  private padre: Apoderado;
  private madre: Apoderado;
  private apoderado: Apoderado;

  constructor(
    private location: Location,
    private etniasService: EtniasService,
    private estadosCivilesService: EstadosCivilesService,
    private postulacionesService: PostulacionesService,
    private apoderadosService: ApoderadosService,
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.postulante = new Postulante(true);
    this.padre = new Apoderado(true,false,false);
    this.madre = new Apoderado(false,true,false);
    this.apoderado = new Apoderado(false,false,true);

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
/*    for(let country of globalVars.countriesArray){
      if(country.translations.es){
        this.countries.push({'nombre':country.translations.es,
          'flag':'flag-icon-'+country.alpha2Code.toLowerCase()})
      } else {
        this.countries.push({'nombre':country.name,
          'flag':'flag-icon-'+country.alpha2Code.toLowerCase()})
      }
    }*/
    this.cursosService.getCursos().subscribe(cursos => {
      for(let c of cursos){
        if(this.grados.length<1 || this.grados.indexOf(c.curso.grado)==-1){
          this.grados.push(c.curso.grado);
        }
      }
    })
  }
  goBack(): void {
    this.location.back();
  }

  onChange(changed: any, other: any) {
    if ( !changed.apoderado && !other.apoderado ) {
      this.apoderado = new Apoderado(false,false,true);
    }

    else if ( changed.apoderado && other.apoderado ) {
      other.apoderado = false;
      this.apoderado = JSON.parse(JSON.stringify(changed));
    }
    else if ( changed.apoderado && !other.apoderado ) {
      this.apoderado = JSON.parse(JSON.stringify(changed));
    }
    else if ( !changed.apoderado && other.apoderado ){
      this.apoderado = JSON.parse(JSON.stringify(other));
    }
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

  savePostulante(){
    if(!this.postulante.sep){
      this.postulante.prioritario = false;
      this.postulante.preferente = false;
    }
    this.postulacionesService.createPostulacion(this.postulante).subscribe(postulante => {
      if(this.padre.usuario.rut){
        this.apoderadosService.createApoderado(postulante.id,this.padre).subscribe();
      }
      if(this.madre.usuario.rut){
        this.apoderadosService.createApoderado(postulante.id,this.madre).subscribe();
      }
      if(!this.padre.apoderado && !this.madre.apoderado && this.apoderado.usuario.rut){
        this.apoderadosService.createApoderado(postulante.id,this.apoderado).subscribe()
      }
      this.modalOpen();
    })
  }

}

export class Usuario{
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: number;
  dv: string;
  fono_casa: string;
  fono_movil: string;
  email: string;
  sexo: string;
  nacionalidad: string;
  estado_civil: string;
  fecha_nacimiento: string;

  constructor(){}
}

export class Postulante{
  aceptado: boolean;
  desiste: boolean;
  lista_espera: boolean;
  rechazado: boolean;
  promovido: boolean;
  matriculado: boolean;
  prioritario: boolean;
  proretencion: boolean;
  preferente: boolean;
  pie: boolean;
  sep: boolean;
  intercambio: boolean;
  internado: boolean;
  excedente: boolean;
  lista: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: number;
  dv: string;
  pasaporte: string;
  etnia: string;
  fono_casa: string;
  fono_movil: string;
  email: string;
  sexo: string;
  nacionalidad: string;
  fecha_nacimiento: string;
  grado: string;

  constructor(public postulante: boolean){}
}

export class Apoderado{
  ocupacion: string;
  titulo: string;
  usuario: Usuario;

  constructor(public padre: boolean, public madre: boolean, public apoderado: boolean){
    this.usuario = new Usuario;
  }
}
