import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { connectionErrorMsg, emptyArrayMsg } from '../../../spinner/spinner.component';

import { MatriculaService } from '../../../../services/sistema/matricula.service';
import { CursosService } from '../../../../services/libros/cursos.service';

@Component({
  selector: 'app-ver-matricula',
  templateUrl: 'ver-matricula.component.html',
  styleUrls: ['ver-matricula.component.css']
})
export class VerMatriculaComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('desactivarModal') desactivarModal: ModalComponent;
  @ViewChild('activarModal') activarModal: ModalComponent;

  filterData:string = '';
  filterKeys = ['nombre', 'apellido_paterno', 'apellido-materno', 'rut'];

  private matriculas = [];
  private cursos = [];

  selectedMatricula_id: number;
  selectedMatricula: any;

  timeoutMessage: string;

  constructor(
    private matriculaService: MatriculaService,
    private cursosService: CursosService,
  ) { }

  getMatriculas() {
    this.matriculaService.getMatriculas().subscribe((response) => {
      this.matriculas = response;
      if(response.length>0){
        this.timeoutMessage = emptyArrayMsg("Matriculas");
      }

      this.cursosService.getCursos().subscribe((res) => {
        this.cursos = res;
      });
    })
  }

  ngOnInit(): void {
    this.timeoutMessage = connectionErrorMsg();
    this.getMatriculas();
  }

  indexOfObj(id: number): number {
    for (let i = 0; i < this.matriculas.length; i++) {
      if ( this.matriculas[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  getCursoNameByCursoId(id: number){
    let curso = this.cursos.find(c => c.curso.id == id).curso;
    if(curso){
      return `${curso.grado} ${curso.curso}`
    }else{
      return '';
    }
  }

  modalOpen(id: number): void {
    this.modal.open();
    this.selectedMatricula_id = id;
  }

  modalClose(id: number): void {
    this.deleteMatricula(id);
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }

  deleteMatricula(id: number){
    this.matriculaService.deleteMatricula(id).subscribe(() => {
      let index = this.matriculas.findIndex(m => m.id == id);
      this.matriculas.splice(index,1);
      this.modal.close();
      this.selectedMatricula_id = null;
    });
  }

  desiste(alumno: any, value: boolean){
    alumno.desiste = value;
    this.matriculaService.updateMatricula(alumno).subscribe(res => {

    });
  }

  desactivarModalOpen(alumno: any){
    this.desactivarModal.open('sm');
    this.selectedMatricula = alumno;
  }

  desactivarModalClose(){
    this.desiste(this.selectedMatricula,true);
    this.desactivarModal.close();
  }

  desactivarModalDismiss(){
    this.desactivarModal.dismiss();
  }

  activarModalOpen(alumno: any){
    this.activarModal.open('sm');
    this.selectedMatricula = alumno;
  }

  activarModalClose(){
    this.desiste(this.selectedMatricula,false);
    this.activarModal.close();
  }

  activarModalDismiss(){
    this.activarModal.dismiss();
  }

}
