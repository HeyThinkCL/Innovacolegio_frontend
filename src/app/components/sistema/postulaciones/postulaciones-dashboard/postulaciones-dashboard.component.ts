import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { PostulacionesService } from '../../../../services/sistema/postulaciones.service';
import { MatriculaService } from '../../../../services/sistema/matricula.service';

@Component({
  selector: 'app-postulaciones-dashboard',
  templateUrl: './postulaciones-dashboard.component.html',
  styleUrls: ['./postulaciones-dashboard.component.css']
})
export class PostulacionesDashboardComponent implements OnInit {
  @ViewChild('confirmModal') confirmModal: ModalComponent;
  @ViewChild('notifyModal') notifyModal: ModalComponent;

  filterData = '';
  selectedTable = '';
  subjects = [];

  private confirmModalMode = {
    mode: null,
    title: '',
    body: '',
  };
  private notifyModalTitle:string;

  constructor(
    private postulacionesService: PostulacionesService,
    private matriculaService: MatriculaService,
  ) { }

  ngOnInit() {
    this.selectedTable = 'tSinResolver';
  }

  //subject catch
  onSelectSubjects(subjects){
    if (subjects){
      this.subjects = subjects;
    } else {
      this.subjects = [];
    }
  }

  //buttons
  deleteSelected(){
    if(this.subjects.length>0){
      let table = this.selectedTable;
      for(let postulante of this.subjects){
        this.selectedTable = '';
        this.matriculaService.deleteMatricula(postulante.id).subscribe(() => {
          this.selectedTable = table;
        })
      }
      this.confirmModalClose();
      this.notifyModalOpen()
    }
  }

  aceptarSelected(){
    if(this.subjects.length>0){
      let table = this.selectedTable;
      for(let postulante of this.subjects){
        this.selectedTable = '';
        if(postulante.rechazado){
          postulante.rechazado = false;
        }
        if(postulante.lista_espera){
          postulante.lista_espera = false;
        }
        if(!(postulante.aceptado)){
          postulante.aceptado = true;
        }
        this.postulacionesService.updatePostulante(postulante).subscribe(res => {
          this.selectedTable = table;
        });
      }
      this.confirmModalClose();
      this.notifyModalOpen()
    }
  }

  moverAListaEsperaSelected(){
    if(this.subjects.length>0){
      let table = this.selectedTable;
      for(let postulante of this.subjects){
        this.selectedTable = '';
        if(postulante.rechazado){
          postulante.rechazado = false;
        }
        if(postulante.aceptado){
          postulante.aceptado = false;
        }
        if(!(postulante.lista_espera)){
          postulante.lista_espera = true;
        }
        this.postulacionesService.updatePostulante(postulante).subscribe(res => {
          this.selectedTable = table;
        });
      }
      this.confirmModalClose();
      this.notifyModalOpen()
    }
  }

  rechazarSelected(){
    if(this.subjects.length>0){
      let table = this.selectedTable;
      for(let postulante of this.subjects){
        this.selectedTable = '';
        if(postulante.lista_espera){
          postulante.lista_espera = false;
        }
        if(postulante.aceptado){
          postulante.aceptado = false;
        }
        if(!(postulante.rechazado)){
          postulante.rechazado = true;
        }
        this.postulacionesService.updatePostulante(postulante).subscribe(res => {
          this.selectedTable = table;
        });
      }
      this.confirmModalClose();
      this.notifyModalOpen()
    }
  }

  //modals
  ////confirmacion
  confirmModalOpen(mode: number){
    this.confirmModalMode.mode = mode;

    if(mode == 1){
      this.confirmModalMode.title = 'Eliminar Postulantes.';
      this.confirmModalMode.body = 'Presione Ok para continuar eliminando los postulantes seleccionados.';
      this.notifyModalTitle = 'Postulaciones eliminadas con éxito.';
    } else if(mode == 2){
      this.confirmModalMode.title = 'Aceptar Postulantes.';
      this.confirmModalMode.body = 'Presione Ok para continuar aceptando los postulantes seleccionados.';
      this.notifyModalTitle = 'Postulaciones aceptadas con éxito.';
    } else if(mode == 3){
      this.confirmModalMode.title = 'Mover Postulantes a Lista de Espera.';
      this.confirmModalMode.body = 'Presione Ok para continuar moviendo los postulantes seleccionados a lista de espera.';
      this.notifyModalTitle = 'Postulaciones movidas a lista de espera con éxito.';
    } else if(mode == 4){
      this.confirmModalMode.title = 'Rechazar Postulantes.';
      this.confirmModalMode.body = 'Presione Ok para continuar rechazando los postulantes seleccionados.';
      this.notifyModalTitle = 'Postulaciones rechazadas con éxito.';
    }
    this.confirmModal.open('lg');
  }

  confirmModalClose(){
    this.confirmModal.close();
  }

  confirmModalDismiss(){
    this.confirmModalMode = {
      mode: null,
      title: '',
      body: '',
    };
    this.confirmModal.dismiss();
  }
  ////notificacion
  notifyModalOpen(){
    this.notifyModal.open();
  }

  notifyModalClose(){
    this.notifyModal.close();
    this.subjects = [];
  }



}
