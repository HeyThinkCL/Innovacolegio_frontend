import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Select2OptionData } from 'ng2-select2';

import { MatriculaService } from '../../../../services/sistema/matricula.service';
import { PostulacionesService } from '../../../../services/sistema/postulaciones.service';
import { ApoderadosService } from '../../../../services/sistema/apoderados.service';

import { CursosService } from '../../../../services/libros/cursos.service';

@Component({
  selector: 'app-crear-matricula',
  templateUrl: 'crear-matricula.component.html',
  styleUrls: ['crear-matricula.component.css'],
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
export class CrearMatriculaComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  public selectData: Array<Select2OptionData> = [];
  public selectOptions: Select2Options;

  public selectCursoData: Array<Select2OptionData> = [];
  public selectCursoOptions: Select2Options;

  postulantes = [];

  postulante: any;
/*  padre: any;
  madre: any;
  apoderado: any;*/

  curso: any;

  constructor(
    private location: Location,
    private cursosService: CursosService,
    private matriculaService: MatriculaService,
    private postulacionesService: PostulacionesService,
  ) { }

  ngOnInit() {
    this.postulacionesService.getAceptadas().subscribe(postulantes => {
      this.postulantes = postulantes;
      this.selectData.push({
        id: ' ',
        text: 'Ninguno'
      });
      for (let postulante of postulantes){
        this.selectData.push({
          id: postulante.id.toString(),
          text: `${postulante.nombre} ${postulante.apellido_paterno} ${postulante.apellido_materno}`
        })
      }
    });

    this.cursosService.getCursos().subscribe(c => {
      this.selectCursoData.push({
        id: ' ',
        text: 'Ninguno'
      });
      for(let curso of c){
        this.selectCursoData.push({
          id:curso.curso.id,
          text:curso.curso.grado+' '+curso.curso.curso,
        });
      }
    })
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

  selectChanged(e: any){
    this.postulante = this.postulantes.find(postulante => postulante.id == +e.value);
  }

  selectNivelChanged(e: any){
    this.curso = +e.value;
  }

  saveMatricula() {
    this.postulante.postulante = false;
    this.postulante.aceptado = false;
    this.postulante.matriculado = true;
    this.matriculaService.updateMatricula(this.postulante).subscribe(alumno => {
      this.cursosService.asignarAlumnoACurso(this.curso,alumno.id).subscribe(res => {
        this.modalOpen();
      });
    });
  }

}
