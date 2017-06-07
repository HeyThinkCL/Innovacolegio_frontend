import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {RedirectService} from '../../../../../services/redirect.service'
import { CursosService } from '../../../../../services/libros/cursos.service';
import { ProfesoresService } from '../../../../../services/libros/profesores.service';
import { AnotacionesService } from '../../../../../services/libros/anotaciones.service';

@Component({
  selector: 'app-curso-anotaciones-ingresar',
  templateUrl: 'curso-anotaciones-ingresar.component.html',
  styleUrls: ['curso-anotaciones-ingresar.component.css']
})
export class CursoAnotacionesIngresarComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('confirm') confirm: ModalComponent;

  id: number;
  private sub: any;

  //actualmente sólo con profesores, se debe llenar con todo tipo de funcionarios en la plataforma
  funcionarios = [];

  asignaturas = [];

  curso: any;
  alumnos: any[] = [];
  selectedAlumno: any;

  anotacion: any;

  confirmMessage: string;
  confirmErrorMessage: string;

  constructor(
    private cursosService: CursosService,
    private anotacionesService: AnotacionesService,
    private profesoresService: ProfesoresService,
    private route: ActivatedRoute,
    private redirectService: RedirectService,
  ) { }

  ngOnInit() {

    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.parent.parent.params
      .switchMap((params: Params) => this.cursosService.getCursoById(params['id']))
      .subscribe((curso) => {
        this.curso = curso;
        this.alumnos = curso.alumnos;
    }, error => {
        if(error==500) {
          this.redirectService.onServerError500();
        }
      });

    this.cursosService.getAsignaturasByCursoId(this.id).subscribe(res => {
      this.asignaturas = res.asignaturas;
    }, error => {
      if(error==500) {
        this.redirectService.onServerError500();
      }
    });

    this.profesoresService.getProfesores().subscribe(res => {
      this.funcionarios = res;
    }, error => {
      if(error==500) {
        this.redirectService.onServerError500();
      }
    });

    this.selectedAlumno = {
      'fullname': '',
      'rut':null,
    };

    this.anotacion = {
      'curso_id':this.id,
      'funcionario_id':null,
      'asignatura_id':null,
      'fecha': '',
      'observacion': '',
      'general': false,
      'tipo':false,
      'seguimiento':false,
      'alumno': this.selectedAlumno,
    };

    this.confirmMessage='';
    this.confirmErrorMessage ='';
  }

  //logic
  toggleGeneral(){
    this.anotacion.general = !(this.anotacion.general);
    if(!(this.anotacion.general)){
      this.clearSelectedAlumno();
      this.anotacion.seguimiento = false;
    }
  };

  setSelectedAlumno(alumno){
    if(!alumno.desiste){
      this.selectedAlumno.rut = alumno.rut;
      this.selectedAlumno['fullname'] = alumno.nombre + ' ' + alumno.apellido_paterno + ' ' + alumno.apellido_materno;
      this.selectedAlumno['id'] = alumno.id;
      this.anotacion.alumno = this.selectedAlumno;
    }

  }

  clearSelectedAlumno(){
    this.selectedAlumno = {
      'fullname': '',
      'rut':null,
      'id':null,
    };
    this.anotacion.alumno = this.selectedAlumno;
  }

  clearAnotacion(){
    this.clearSelectedAlumno();
    this.anotacion = {
      'curso_id':this.id,
      'funcionario_id':null,
      'asignatura_id':null,
      'fecha': '',
      'observacion': '',
      'general': false,
      'tipo':false,
      'seguimiento':false,
      'alumno': this.selectedAlumno,
    };
  }

  //service
  saveAnotacion(){
    this.anotacionesService.createAnotacion(this.anotacion).subscribe((res) =>{
      this.confirmMessage = 'Anotacion creada con éxito.';
      this.confirmOpen();
      this.clearAnotacion();

    }, error => {
      if(error==500) {
        this.redirectService.onServerError500();
      }
    })
  }

  //modal
  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
  }

  //confirm
  confirmOpen(): void {
    this.confirm.open();
  }

  confirmClose(): void {
    this.confirm.close();
  }
}
