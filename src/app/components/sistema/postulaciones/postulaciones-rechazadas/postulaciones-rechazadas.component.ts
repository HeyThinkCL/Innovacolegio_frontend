import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { connectionErrorMsg, emptyArrayMsg } from '../../../spinner/spinner.component';

import { PostulacionesService } from '../../../../services/sistema/postulaciones.service';
import { MatriculaService } from '../../../../services/sistema/matricula.service';


@Component({
  selector: 'app-postulaciones-rechazadas',
  templateUrl: 'postulaciones-rechazadas.component.html',
  styleUrls: ['postulaciones-rechazadas.component.css']
})
export class PostulacionesRechazadasComponent implements OnInit {
  @Input('filter') filterData: string;
  @Output() onSelect = new EventEmitter<any>();
  @ViewChild('deleteModal') deleteModal: ModalComponent;

  private postulaciones = [];
  postulacionToDelete_id: number;
  selected = [];

  filterKeys = ['nombre','rut'];

  timeoutMessage: string;
  timeout: number;

  constructor(
    private postulacionesService: PostulacionesService,
    private matriculaService: MatriculaService,
  ) { }

  ngOnInit() {
    this.timeoutMessage = connectionErrorMsg();
    this.postulacionesService.getRechazadas().subscribe(res => {
      this.timeout = null;
      this.postulaciones = res;
      if(!(res.length<0)){
        this.timeout = 1;
        this.timeoutMessage = emptyArrayMsg("Postulaciones");
      }
    });

  }

  selectAlumno(id){
    if (this.include(this.selected,id)){
      this.selected.splice(this.selected.indexOf(id),1);
    } else {
      this.selected.push(id);
    }
    this.emitSelection();
  }



  emitSelection(){
    let selectedPostulaciones = [];
    for(let postulacionId of this.selected){
      selectedPostulaciones.push(this.postulaciones.find(postulacion => postulacion.id == postulacionId))
    }
    this.onSelect.emit(selectedPostulaciones);
  }

  //modals
  deleteModalOpen(id: number): void {
    this.deleteModal.open();
    this.postulacionToDelete_id = id;
  }

  deleteModalClose(id: number): void {
    this.deletePostulacion(id);
  }

  deleteModalDismiss(): void {
    this.deleteModal.dismiss();
  }

  deletePostulacion(id: number){
    this.matriculaService.deleteMatricula(id).subscribe(() => {
      let index = this.indexOfObj(id);
      this.postulaciones.splice(index,1);
      this.deleteModal.close();
      this.postulacionToDelete_id = null;
    });
  }

  indexOfObj(id: number): number {
    for (let i = 0; i < this.postulaciones.length; i++) {
      if ( this.postulaciones[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  include(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }

}
