import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {InformesService} from '../../../services/documentos/informes.service';

import * as globalVar from '../../../globals';

@Component({
  selector: 'app-informes2',
  templateUrl: './informes2.component.html',
  styleUrls: ['./informes2.component.css']
})
export class Informes2Component implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  public docsToGenerate: any[] = [];

  public docToGen = {
    docId: null,
    filter:null,
    subjects: [],
    options: null,
  };

  public options = {
    year: null,
    periodo: null,
  };

  public years = [2015,2017,2016];
  public periodos = [
    {
      year:2015,
      periodos:2,
    },
    {
      year:2016,
      periodos:3,
    },
    {
      year:2017,
      periodos:2,
    }
  ];

  docs = [
    {'id':1,'nombre':'Informe de Notas'},
    {'id':2,'nombre':'Lista de Curso'},
    {'id':3,'nombre':'Inasistencias por Curso'},
    {'id':4,'nombre':'Resumen General del Curso'},
    {'id':5,'nombre':'Asistencia del Colegio'},
    {'id':6,'nombre':'Extranjeros'},
    {'id':7,'nombre':'Indigenas'},
  ];

  filters = [
    // {'id':1,'nombre':'Por Plan de Estudios','icon':'icon-institution'},
    // {'id':2,'nombre':'Por Tipo de Enseñanza','icon':'icon-institution'},
    // {'id':3,'nombre':'Por Nivel','icon':'icon-mortar-board'},
    {'id':0,'nombre':'Por Colegio','icon':'icon-institution'},
    {'id':4,'nombre':'Por Curso','icon':'icon-users'},
    {'id':5,'nombre':'Por Alumno','icon':'icon-user'},
  ];

  docsId: any[] = [];
  filterId: number;
  subjectsId: any[] = [];

  constructor(
    private informesService: InformesService,
  ) { }

  ngOnInit() {
  }

  getPeriodoSelect(y: number){
    if(y==null){
      return [];
    } else {
      let p = [];
      let periodos = this.periodos.find(p => p.year==y).periodos;
      for(let i=1; i<periodos+1; i++){
        let period = {
          value: i,
          text:null,
        };

        if(periodos==2){
          if(i==1){
            period.text="Primer Semestre"
          } else {
            period.text="Segundo Semestre"
          }
        } else if (periodos==3){
          if(i==1){
            period.text="Primer Trimestre"
          } else if(i==2) {
            period.text="Segundo Trimestre"
          } else {
            period.text="Tercer Trimestre"
          }
        }

        p.push(period);
      }

      return p;
    }
  }

  setDocumento(id){
    this.docToGen.docId = id;
  }

  unsetDocumento(){
    this.docToGen = {
      docId: null,
      filter:null,
      subjects: [],
      options: null,
    }
  };

  setOpciones(){
    this.docToGen.options = this.options;
  }

  unsetOpciones(){
    this.docToGen.options = null;
  }

  setFiltro(id){
    this.docToGen.filter = id;
    if(id==0){
      this.subjectsId.push(this.informesService.getColegioId());
    }
  }

  unsetFiltro(){
    this.docToGen.filter = null;
    this.subjectsId = [];
  }

  setSubjects(){
    this.docToGen.subjects=this.subjectsId;
  }

  unsetSubjects(){
    this.docToGen.subjects = [];
  }

  addDocToQueue(){
    this.setSubjects();
    this.docsToGenerate.push(this.docToGen);
    this.subjectsId = [];
    this.options = {
      year: null,
      periodo: null,
    };
    this.unsetDocumento();
  }

  removeDocFromQueue(idx: number){
    this.docsToGenerate.splice(idx,1);
  }

  restrictFilters(){
    let docId = this.docToGen.docId;
    let _filters = JSON.parse(JSON.stringify(this.filters));
    if(docId==1 || docId==2 || docId==3 || docId==4){
      _filters.splice(_filters.findIndex(f => f.id==0),1);
    }
    if(docId==5){
      _filters.splice(_filters.findIndex(f => f.id==4),2);
    }
    if(docId==2 || docId==3 || docId==4 || docId==6 || docId==7){
      _filters.splice(_filters.findIndex(f => f.id==5),1);
    }

    return _filters;
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

  getDocName(id: number): string {
    return this.docs.find(d => d.id==id).nombre;
  }

  getFilterName(id: number): string {
    return this.filters.find(f => f.id==id).nombre;
  }

  getFilterIcon(id: number): string {
    return this.filters.find(f => f.id==id).icon;
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
  }

  generateDocs(){
    let _wait:boolean[] = [];

    if(this.docsToGenerate.length>0){
      this.modalOpen();
    }

    for(let d of this.docsToGenerate){
      if(d.docId==1){
        _wait.push(false);
        this.informesService.generateInformeNotas(d.filter,d.subjects).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsToGenerate.findIndex(doc => doc.docId==d.docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })

      }
      if(d.docId==2){
        _wait.push(false);
        this.informesService.generateListaDeCurso(d.filter,d.subjects).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsToGenerate.findIndex(doc => doc.docId==d.docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })

      }
      if(d.docId==3){
        _wait.push(false);
        this.informesService.generateInasistenciaCurso(d.filter,d.subjects).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsToGenerate.findIndex(doc => doc.docId==d.docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })

      }
      if(d.docId==4){
        _wait.push(false);
        this.informesService.generateResumenCurso(d.filter,d.subjects).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsToGenerate.findIndex(doc => doc.docId==d.docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })

      }
      if(d.docId==5){
        _wait.push(false);
        this.informesService.generateAsistenciaColegio(d.filter,d.subjects).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsToGenerate.findIndex(doc => doc.docId==d.docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })
      }
      if(d.docId==6){
        _wait.push(false);
        this.informesService.generateInformeExtranjeros(d.filter,d.subjects).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsToGenerate.findIndex(doc => doc.docId==d.docId);
            _wait[docIdx] = true;
            if(!_wait.find(w => w==false)){
              this.modalClose();
            }
          }
        })
      }
      if(d.docId==7){
        _wait.push(false);
        this.informesService.generateInformeIndigenas(d.filter,d.subjects).subscribe(res => {
          if(res && res.status){
            let url: string = globalVar.apiUrl+'/'+res.status;
            window.open(url);

            let docIdx = this.docsToGenerate.findIndex(doc => doc.docId==d.docId);
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
