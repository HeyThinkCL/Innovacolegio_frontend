import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {trigger,state,style,animate,transition} from '@angular/animations';

import {CertificadosService} from '../../../services/documentos/certificados.service';

import * as globalVar from '../../../globals';

@Component({
  selector: 'app-certificados2',
  templateUrl: './certificados2.component.html',
  styleUrls: ['./certificados2.component.css'],
  animations: [
    trigger(
      'collapse', [
        transition(':enter', [
          style({height: '*', opacity: 0}),
          animate('150ms', style({height: 0, opacity: 1}))
        ]),
        transition(':leave', [
          style({height: 0, 'opacity': 1}),
          animate('150ms', style({height: '*', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'fade', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('150ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'shrink', [
        transition(':enter', [
          style({transform: 'scale(0) ', opacity: 0}),
          animate('150ms', style({transform: 'scale(1)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'scale(1)', 'opacity': 1}),
          animate('150ms', style({transform: 'scale(0)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class Certificados2Component implements OnInit {
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
    {'id':1,'nombre':'Certificado Matricula'},
    {'id':2,'nombre':'Certificado Alumno Regular'},
    {'id':3,'nombre':'Certificado de Inscripción'},
    {'id':4,'nombre':'Certificado de Asistencia'},
    {'id':5,'nombre':'Certificado de Traslado'},
    // {'id':6,'nombre':'Ranking 4tos Medios'},
    // {'id':8,'nombre':'Permiso de Salida'},
  ];

  filters = [
    // {'id':1,'nombre':'Por Plan de Estudios','icon':'icon-institution'},
    // {'id':2,'nombre':'Por Tipo de Enseñanza','icon':'icon-institution'},
    // {'id':3,'nombre':'Por Nivel','icon':'icon-mortar-board'},
    {'id':4,'nombre':'Por Curso','icon':'icon-users'},
    {'id':5,'nombre':'Por Alumno','icon':'icon-user'},
  ];

  docsId: any[] = [];
  filterId: number;
  subjectsId: any[] = [];

  constructor(
    private certificadosService: CertificadosService,
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
      this.subjectsId.push(this.certificadosService.getColegioId());
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

  getCertificadoAccidente(){
    window.open(globalVar.apiUrl+'/'+'certificados/descargas/certificado_accidente.pdf');
  }

  generateDocs(){
    let _wait:boolean[] = [];

    if(this.docsToGenerate.length>0){
      this.modalOpen();
    }

    for(let d of this.docsToGenerate){
      if(d.docId==1){
        _wait.push(false);
        this.certificadosService.generateMatricula(d.filter,d.subjects).subscribe(res => {
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
        this.certificadosService.generateAlumnoRegular(d.filter,d.subjects).subscribe(res => {
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
        this.certificadosService.generateInscripcion(d.filter,d.subjects).subscribe(res => {
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
        this.certificadosService.generateAsistencia(d.filter,d.subjects).subscribe(res => {
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
        this.certificadosService.generateTraslado(d.filter,d.subjects).subscribe(res => {
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
