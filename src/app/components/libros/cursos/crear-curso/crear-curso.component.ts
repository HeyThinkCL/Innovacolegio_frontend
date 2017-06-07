import {Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import {RedirectService} from '../../../../services/redirect.service'
import { CursosService } from '../../../../services/libros/cursos.service';
import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';
import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';


@Component({
  selector: 'app-crear-curso',
  templateUrl: 'crear-curso.component.html',
  styleUrls: ['crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  private default_date: Date;
  private curso: any ={
    'anio':null,
    'plan_id':null,
    'ensenanza_id':null,
    'grado_id':null,
  };

  planesDeEstudio = [];

  //planes de estudio select2
  public selectPlanesData: Array<Select2OptionData> = [];
  public selectPlanesOptions: Select2Options;

  //tipos de enseñanza select2
  public selectTiposData: Array<Select2OptionData> = [];
  public selectTiposOptions: Select2Options;
  public selectTiposRender: boolean = true;

  //tipos de enseñanza select2
  public selectNivelesData: Array<Select2OptionData> = [];
  public selectNivelesOptions: Select2Options;
  public selectNivelesRender: boolean = true;

  selectedPlan: any;
  selectedTipo: any;

  modalMessage: string;
  modalErrorMessage: string;

  niveles = [
    {"id":"1ro básico"},
    {"id":"2do básico"},
    {"id":"3ro básico"},
    {"id":"4to básico"},
    {"id":"5to básico"},
    {"id":"6to básico"},
    {"id":"7mo básico"},
    {"id":"8vo básico"},
    {"id":"1ro medio"},
    {"id":"2do medio"},
    {"id":"3ro medio"},
    {"id":"4to medio"},
  ];

  constructor(
    private location: Location,
    private router: Router,
    private cursosService: CursosService,
    private planDeEStudiosService: PlanDeEstudiosService,
    private configuracionService: ConfiguracionService,
    private redirectService: RedirectService,
  ) {
  }

  ngOnInit() {

    this.configuracionService.getConfiguraciones().subscribe(configs => {
      let configId = configs.find(c => c.glosa == 'Planes de Estudio y Tipos de Enseñanza' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;

      this.planDeEStudiosService.getConfigPlanesDeEstudio(configId).subscribe(res => {
        if(res && res.planes && res.planes.length>0){
          this.planesDeEstudio = res.planes;

          this.selectPlanesData.push({
            id:' ',
            text:'Seleccionar Plan de Estudios'
          });

          for(let plan of this.planesDeEstudio){
            if(this.selectPlanesData.length==0){
            }
            this.selectPlanesData.push({
              id:plan.id,
              text: plan.decreto.length>70 ? plan.decreto.substring(0,plan.decreto.length-18)+'...' : plan.decreto,
            })
          }

          this.selectTiposData.push({
            id:' ',
            text:'Seleccionar Tipo de Enseñanza'
          });

          this.selectNivelesData.push({
            id:' ',
            text:'Seleccionar Nivel'
          });

        } else {
          let currentRol = +atob(atob(JSON.parse(localStorage.getItem('currentUser')).rol))[5];
          if(currentRol==4||currentRol==5){
            this.router.navigate(['app/alerta-configuracion',3]);
          } else {
            this.router.navigate(['app/sistema/configuracion/planes-ensenanza']);
          }
        }

      });
    });


    this.selectPlanesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Plan de Estudios',
    };

    this.selectTiposOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Tipo de Enseñanza',
    };

    this.selectNivelesOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Nivel',
    };

    this.default_date = new Date();
    if (this.default_date.getMonth() > 4) {
      this.default_date.setFullYear(this.default_date.getFullYear() + 1);
    }
    this.curso.anio = this.default_date.getFullYear().toString();
    this.modalErrorMessage ='';
  }

  planChanged(e: any){
    if(e){
      this.curso.plan_id = +e;

      this.selectTiposRender = false;
      this.selectNivelesRender = false;

      this.selectedPlan = this.planesDeEstudio.find(plan => plan.id==+e);
      this.selectedTipo = null;

      this.selectNivelesData = [];
      this.selectTiposData = [];

      this.selectTiposData.push({
        id:' ',
        text:'Seleccionar Tipo de Enseñanza'
      });

      this.selectNivelesData.push({
        id:' ',
        text:'Seleccionar Nivel'
      });

      for(let tipo of this.selectedPlan.tipos){
        this.selectTiposData.push({
          id:tipo.tipo.id,
          text:tipo.tipo.glosa
        })
      }

      this.selectTiposRender = true;
      this.selectNivelesRender = true;

    } else {
      this.curso.plan_id = e;

      this.selectTiposRender = false;
      this.selectNivelesRender = false;
      this.selectTiposData = [];
      this.selectNivelesData = [];
      this.selectTiposData.push({
        id:' ',
        text:'Seleccionar Tipo de Enseñanza'
      });

      this.selectNivelesData.push({
        id:' ',
        text:'Seleccionar Nivel'
      });
      this.selectTiposRender = true;
      this.selectNivelesRender = true;

      this.selectedTipo = null;
      this.selectedPlan = null;
    }

  }

  tipoChanged(e: any){
    if(e){
      this.curso.ensenanza_id = +e;
      this.selectedTipo = this.selectedPlan.tipos.find(tipo => tipo.tipo.id == +e);

      this.selectNivelesRender = false;
      this.selectNivelesData = [];
      this.selectNivelesData.push({
        id:' ',
        text:'Seleccionar Nivel'
      });
      if(this.selectedTipo){
        for(let nivel of this.selectedTipo.grados){
          this.selectNivelesData.push({
            id:nivel.id,
            text:nivel.glosa,
          })
        }
      }
      this.selectNivelesRender = true;

    } else {
      this.curso.ensenanza_id = e;
      this.selectNivelesRender = false;
      this.selectNivelesData = [];

      this.selectNivelesData.push({
        id:' ',
        text:'Seleccionar Nivel'
      });
      this.selectNivelesRender = true;
      this.selectedTipo = null;
    }

  }

  nivelChanged(e: any){
    this.curso.grado_id = +e;
  }

  goBack(): void {
    this.location.back();
  }

  saveCurso() {
    this.cursosService.createCurso(this.curso).subscribe((res) => {
      this.modalMessage = 'Curso creado con éxito.';
      this.modalOpen();
    }, error => {
      if(error==500) {
        this.redirectService.onServerError500();
      }
    });
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.modalErrorMessage = '';
  }

}
