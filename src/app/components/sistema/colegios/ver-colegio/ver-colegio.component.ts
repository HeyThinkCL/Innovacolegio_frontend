import {Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { connectionErrorMsg, emptyArrayMsg } from '../../../spinner/spinner.component';

import { ColegiosService } from '../../../../services/sistema/colegios.service'
import {Colegio} from "../colegio";

@Component({
  selector: 'app-ver-colegio',
  templateUrl: 'ver-colegio.component.html',
  styleUrls: ['ver-colegio.component.css']
})
export class VerColegioComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  private colegios = [];
  selectedColegio_id: number;
  filterData:string  = '';
  filterKeys = ['nombre','razon_social','dependencia','sostenedor','depto_prov'];

  timeoutMessage: string;

  constructor(
    private colegiosService: ColegiosService,
  ) { }

  getColegios() {
    this.colegiosService.getColegios().subscribe((response) => {
      this.colegios = response;
      if(this.colegios.length < 1 ){
        this.timeoutMessage = emptyArrayMsg('Colegios');
      }
    })
  }

  ngOnInit(): void {
    this.timeoutMessage = connectionErrorMsg();
    this.getColegios();
  }

  indexOfObj(id: number): number {
    for (let i = 0; i < this.colegios.length; i++) {
      if ( this.colegios[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  modalOpen(id: number): void {
    this.modal.open();
    this.selectedColegio_id = id;
  }

  modalClose(id: number): void {
    this.deleteColegio(id);
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }

  isSelected(colegioId){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.colegioId==colegioId;
  }

  selectColegio(colegioId){
    if(!this.isSelected(colegioId)){
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser.colegioId = colegioId;
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser',JSON.stringify(currentUser));
    }

  }


  deleteColegio(id: number): void {
    this.colegiosService.deleteColegio(id).subscribe(()=>{
      let index = this.indexOfObj(id);
      this.colegios.splice(index,1);
      this.modal.close();
      this.selectedColegio_id = null;
    });
  }

}
