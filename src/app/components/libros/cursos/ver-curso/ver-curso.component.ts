import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


import { connectionErrorMsg, emptyArrayMsg } from '../../../spinner/spinner.component';

import { CursosService } from '../../../../services/libros/cursos.service';
import { Curso } from '../curso';
import { PlanDeEstudiosService } from '../../../../services/sistema/configuraciones/plan-de-estudios.service';
import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';

@Component({
  selector: 'app-ver-curso',
  templateUrl: 'ver-curso.component.html',
  styleUrls: ['ver-curso.component.css']
})
export class VerCursoComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  cursos = [];

  filterData: string = '';
  filterKeys = [
    {
    'mainKey':'curso',
    'subKeys':['grado','curso']
    }
  ];

  private planesDeEstudio = [];
  selectedCurso_id: number;

  timeoutMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private planDeEStudiosService: PlanDeEstudiosService,
    private configuracionService: ConfiguracionService,
  ) { }

  ngOnInit() {
    this.timeoutMessage = connectionErrorMsg();
    this.getCursos();
  }

  getCursos() {
    this.cursosService.getCursos().subscribe((res) => {
      this.cursos = res;
      if(!(res.length>0)){
        this.timeoutMessage = emptyArrayMsg("Cursos");
      }
    });

    this.configuracionService.getConfiguraciones().subscribe(configs => {
      let configId = configs.find(c => c.glosa == 'Planes de Estudio y Tipos de Enseñanza' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;

      this.planDeEStudiosService.getConfigPlanesDeEstudio(configId).subscribe(res => {
        if(res && res.planes && res.planes.length>0){
          this.planesDeEstudio = res.planes;
        } else {
          let currentRol = +atob(atob(JSON.parse(localStorage.getItem('currentUser')).rol))[5];
          if(currentRol==4||currentRol==5){
            this.router.navigate(['app/alerta-configuracion',3]);
          } else {
            this.router.navigate(['app/sistema/configuracion/planes-ensenanza']);
          }
        }

      })
    })
  }

  checkMultiplesCursos(grado: string){
    return this.getAllInstancesByGrado(this.cursos,grado).length>1? true : false;
  }

  getAllInstancesByGrado(array, grado): any[]{
    let instances = [];

    for(let a of array){
      if(a.curso.grado==grado){
        instances.push(a);
      }
    }
    return instances;
  }

  indexOfObj(id: number): number {
    for (let i = 0; i < this.cursos.length; i++) {
      if ( this.cursos[i].curso.id == id) {
        return i;
      }
    }
    return -1;
  }

  getPlanName(planId: number){
    let plan = this.planesDeEstudio.find(p => p.id == planId);
    if(plan){
      let planName = plan.decreto;
      return planName.length>50 ? planName.substring(0,planName.length-10)+'...' : planName;
    } else return '';

  }

  getTipoName(planId: number, tipoId: number){

    let plan = this.planesDeEstudio.find(p => p.id == planId);
    if(plan){
      let tipo = plan.tipos.find(t => t.tipo.id == tipoId);
      if(tipo){
        let tipoName = tipo.tipo.glosa;
        return tipoName.length>50 ? tipoName.substring(0,tipoName.length-18)+'...' : tipoName;
      }
    }
    return '';

  }

  goToCurso(cursoId: number){
    let check = this.cursos.find(c => c.curso.id == cursoId).curso.preparado;
    if(check){
      this.router.navigate(['./',cursoId],{relativeTo:this.route})
    }
  }
  //preparar cursos
  prepararCurso(cursoId: number){
    this.cursosService.prepareCurso(cursoId).subscribe(res => {
      let updatedCurso = this.cursos.find(c => c.curso.id==cursoId);
      updatedCurso.curso.preparado = true;

    })
  }

  prepararCursosAll(){
    for(let curso of this.cursos){
      this.cursosService.prepareCurso(curso.curso.id).subscribe(res => {
        curso.curso.preparado = true;
      })
    }
  }

  checkPrepararAll(): boolean{
    return this.cursos.findIndex(c => c.curso.preparado == false)==-1;
  }

  modalOpen(id: number): void {
    this.modal.open();
    this.selectedCurso_id = id;
  }

  modalClose(id: number): void {
    this.deleteCurso(id);
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }


  deleteCurso(id: number): void {
    this.cursosService.deleteCurso(id).subscribe(()=>{
      let index = this.indexOfObj(id);
      this.cursos.splice(index,1);
      this.modal.close();
      this.selectedCurso_id = null;
    });
  }

}
