import {Component, OnInit, ViewChild} from '@angular/core';

import {CertificadosService} from '../../../services/documentos/certificados.service';

import * as globalVar from '../../../globals';
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  docs = [
    {'id':1,'nombre':'Certificado Matricula'},
    {'id':2,'nombre':'Certificado Alumno Regular'},
    {'id':3,'nombre':'Certificado de Inscripción'},
    {'id':4,'nombre':'Certificado de Asistencia'},
    {'id':5,'nombre':'Certificado de Traslado'},
    // {'id':6,'nombre':'Ranking 4tos Medios'},
    // {'id':8,'nombre':'Permiso de Salida'},
  ];

  options = [
    // {'id':1,'nombre':'Por Plan de Estudios','icon':'icon-institution'},
    // {'id':2,'nombre':'Por Tipo de Enseñanza','icon':'icon-institution'},
    // {'id':3,'nombre':'Por Nivel','icon':'icon-mortar-board'},
    {'id':4,'nombre':'Por Curso','icon':'icon-users'},
    {'id':5,'nombre':'Por Alumno','icon':'icon-user'},
  ];

  docsId: any[] = [];
  optionId: number;
  subjectsId: any[] = [];

  constructor(
    private certificadosService: CertificadosService,
  ) { }

  ngOnInit() {
  }

  setDocumento(id: string){
    if(this.include(this.docsId,id)){
      this.docsId.splice(this.docsId.indexOf(id),1);
    } else {
      this.docsId.push(id);
    }
  }

  setOption(id){
    this.subjectsId = [];
    if(this.optionId == id){
      this.optionId = null;
    } else {
      this.optionId = id;
    }
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

  getCertificadoAccidente(){
    window.open(globalVar.apiUrl+'/'+'certificados/descargas/certificado_accidente.pdf');
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
        this.certificadosService.generateMatricula(this.optionId,this.subjectsId).subscribe(res => {
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
        this.certificadosService.generateAlumnoRegular(this.optionId,this.subjectsId).subscribe(res => {
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
        this.certificadosService.generateInscripcion(this.optionId,this.subjectsId).subscribe(res => {
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
        this.certificadosService.generateAsistencia(this.optionId,this.subjectsId).subscribe(res => {
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
        this.certificadosService.generateTraslado(this.optionId,this.subjectsId).subscribe(res => {
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

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
  }


}
