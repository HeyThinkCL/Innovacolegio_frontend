import {Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {emptyArrayMsg,connectionErrorMsg} from '../../../spinner/spinner.component';

import {RedirectService} from '../../../../services/redirect.service'
import { Curso } from '../curso';
import { CursosService } from '../../../../services/libros/cursos.service';
import { ProfesoresService } from '../../../../services/libros/profesores.service';

@Component({
  selector: 'app-asignar-prof',
  templateUrl: 'asignar-profesor-a-curso.component.html',
  styleUrls: ['asignar-profesor-a-curso.component.css']
})
export class AsignarProfesorACursoComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  timeoutMessage: string;

  curso: any;

  profesores = [];

  constructor(
    private location: Location,
    private cursosService: CursosService,
    private profesoresService: ProfesoresService,
    private route: ActivatedRoute,
    private redirectService: RedirectService,
  ) { }

  ngOnInit() {
    this.timeoutMessage = connectionErrorMsg();

    this.getProfesores();

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.cursosService.getCurso(+params['id']))
      .subscribe((curso) => {
        this.curso = curso;
      });

  }
  //../services
  getProfesores() {
    this.profesoresService.getProfesores().subscribe((res) => {
      this.profesores = res;
      if(this.profesores.length<1){
        this.timeoutMessage = emptyArrayMsg('Profesores');
      }
    }, error => {
      if(error==500) {
        this.redirectService.onServerError500();
      }
    })
  }

  saveCurso() {
    this.cursosService.updateCurso(this.curso.curso).subscribe((res) => {
      this.modalOpen();
    }, error => {
      if(error==500) {
        this.redirectService.onServerError500();
      }
    });
  }
  //navigation
  goBack(): void {
    this.location.back();
  }
  //modal
  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

}
