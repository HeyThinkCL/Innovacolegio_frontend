import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {InformesService} from '../../../services/documentos/informes.service';

import * as globalVar from '../../../globals';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  docs = [
    {'id':1,'nombre':'Informe de Notas'},
    {'id':2,'nombre':'Lista de Curso'},
    {'id':3,'nombre':'Inasistencias por Curso'},
    {'id':4,'nombre':'Resumen General del Curso'},
    {'id':5,'nombre':'Asistencia del Colegio'},
    {'id':6,'nombre':'Extranjeros'},
    {'id':7,'nombre':'Indigenas'},
  ];

  options = [
    // {'id':1,'nombre':'Por Plan de Estudios','icon':'icon-institution'},
    // {'id':2,'nombre':'Por Tipo de Enseñanza','icon':'icon-institution'},
    // {'id':3,'nombre':'Por Nivel','icon':'icon-mortar-board'},
    {'id':0,'nombre':'Por Colegio','icon':'icon-institution'},
    {'id':4,'nombre':'Por Curso','icon':'icon-users'},
    {'id':5,'nombre':'Por Alumno','icon':'icon-user'},
  ];

  docsId: any[] = [];
  optionId: number;
  subjectsId: any[] = [];

  constructor(
    private informesService: InformesService,
  ) { }

  ngOnInit() {
  }

  setDocumento(id){
    if(this.include(this.docsId,id)){
      this.docsId.splice(this.docsId.indexOf(id),1);
    } else {
      this.docsId.push(id);
      if(this.checkPorAlumno() && !(id==1)){
        this.setOption(null);
      } else if (this.optionId==0 && (id==1 || id==2 || id==3 || id==4)){
        this.setOption(null);
      } else if (this.optionId==4 && id==5){
        this.setOption(null);
      }
    }
  }

  setOption(id){
    this.subjectsId = [];
    if(this.optionId == id){
      this.optionId = null;
    } else {
        this.optionId = id;
        if(this.porAlumnosLock() && id==5){
          this.optionId=null;
        } else if (this.porCursosLock() && id==4){
          this.optionId=null;
        } else if (this.porColegioLock() && id==0){
          this.optionId = null;
        }
    }

    if(this.optionId==0){
      this.subjectsId.push(this.informesService.getColegioId());
    }
  }

  porAlumnosLock(): boolean{
    return !((this.docsId.length==1 && this.include(this.docsId,1)) || this.docsId.length==0);
  }

  porCursosLock(): boolean{
    return this.include(this.docsId,5);
  }

  porColegioLock(): boolean{
    if(this.include(this.docsId,1) || this.include(this.docsId,2) || this.include(this.docsId,3) || this.include(this.docsId,4)){
      return true;
    }
    return false;
  }

  include(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }

  onSelectSubjects(subjects){
    if (subjects){
      this.subjectsId = subjects;
    } else {
      this.subjectsId = [];
    }

  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
  }

  checkPorAlumno(): boolean{
    return this.optionId==5;
  }

  generateDocs(){
    let payload = {
      'docs':this.docsId,
      'filtro': this.optionId,
      'sujetos':this.subjectsId,
    };

    let _wait:boolean[] = [];

    if(this.docsId.length>0){
      this.modalOpen();
    }

    for(let docId of this.docsId){
      if(docId==1){
        _wait.push(false);
        this.informesService.generateInformeNotas(this.optionId,this.subjectsId).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsId.findIndex(d => d==docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })

      }
      if(docId==2){
        _wait.push(false);
        this.informesService.generateListaDeCurso(this.optionId,this.subjectsId).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsId.findIndex(d => d==docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })

      }
      if(docId==3){
        _wait.push(false);
        this.informesService.generateInasistenciaCurso(this.optionId,this.subjectsId).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsId.findIndex(d => d==docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })

      }
      if(docId==4){
        _wait.push(false);
        this.informesService.generateResumenCurso(this.optionId,this.subjectsId).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsId.findIndex(d => d==docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })

      }
      if(docId==5){
        _wait.push(false);
        this.informesService.generateAsistenciaColegio(this.optionId,this.subjectsId).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsId.findIndex(d => d==docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })
      }
      if(docId==6){
        _wait.push(false);
        this.informesService.generateInformeExtranjeros(this.optionId,this.subjectsId).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsId.findIndex(d => d==docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })
      }
      if(docId==7){
        _wait.push(false);
        this.informesService.generateInformeIndigenas(this.optionId,this.subjectsId).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsId.findIndex(d => d==docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })
      }
    }

  }

}
