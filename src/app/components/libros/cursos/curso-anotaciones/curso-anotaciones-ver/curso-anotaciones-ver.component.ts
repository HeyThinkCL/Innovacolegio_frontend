import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {RedirectService} from '../../../../../services/redirect.service'
import { CursosService } from '../../../../../services/libros/cursos.service';
import { ProfesoresService } from '../../../../../services/libros/profesores.service';
import { MatriculaService } from '../../../../../services/sistema/matricula.service';
import {AnotacionesService} from "../../../../../services/libros/anotaciones.service";

@Component({
  selector: 'app-curso-anotaciones-ver',
  templateUrl: 'curso-anotaciones-ver.component.html',
  styleUrls: ['curso-anotaciones-ver.component.css'],
})
export class CursoAnotacionesVerComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  alumnos: any[] = [];
  selectedAlumno: any;

  constructor(
    private cursosService: CursosService,
    private profesoresService: ProfesoresService,
    private matriculaService: MatriculaService,
    private anotacionesService: AnotacionesService,
    private route: ActivatedRoute,
    private redirectService: RedirectService,
  ) { }

  ngOnInit() {
    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.selectedAlumno = {
      'id':null
    };

    this.cursosService.getCursoById(this.id).subscribe(curso => {
      this.alumnos = curso.alumnos;
      for (let alumno of this.alumnos){
        this.anotacionesService.getAnotacionesByAlumnoId(alumno.id).subscribe((anotaciones) =>{
          alumno['anotaciones'] = anotaciones;
          for (let anotacion of alumno.anotaciones){
            anotacion['show'] = false;
            if(anotacion.profesor_id){
              this.profesoresService.getProfesorById(anotacion.profesor_id).subscribe((profesor) => {
                anotacion['profesor'] = {
                  'nombre':profesor.usuario.nombre,
                  'apellido_paterno': profesor.usuario.apellido_paterno,
                  'apellido_materno': profesor.usuario.apellido_materno
                }
              });
            } else {
              anotacion['profesor'] = {
                'nombre':'',
                'apellido_paterno': '',
                'apellido_materno': ''
              }
            }

            if(anotacion.asignatura_id){
              let asignatura: any;
              this.cursosService.getAsignaturasByCursoId(this.id).subscribe((asignaturas) => {
                asignatura = asignaturas.asignaturas.find(res => res.asignatura.datos.id == anotacion.asignatura_id);
                anotacion['asignatura'] = {
                  'nombre': asignatura.asignatura.datos.nombre,
                }
              }, error => {
                if(error==500) {
                  this.redirectService.onServerError500();
                }
              })
            } else {
              anotacion['asignatura'] = {}
            }
          }
        }, error => {
          if(error==500) {
            this.redirectService.onServerError500();
          }
        });
      }
    }, error => {
      if(error==500) {
        this.redirectService.onServerError500();
      }
    });

  }

  modalOpen(alumno: any){
    this.setSelected(alumno);
    this.modal.open('lg');
  }

  modalClose(){
    this.modal.close();
    this.selectedAlumno = {};
  }

  setSelected(alumno: any){
    this.selectedAlumno = alumno;
  }

  toggleShow(anotacion){
    anotacion.show = !(anotacion.show);
  }

}
