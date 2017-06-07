import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {ProfesoresService} from '../../../../services/libros/profesores.service';
import {CursosService} from '../../../../services/libros/cursos.service';
import {ColegiosService} from '../../../../services/sistema/colegios.service';
import {ConfiguracionService} from "../../../../services/sistema/configuracion.service";
import {PlanDeEstudiosService} from "../../../../services/sistema/configuraciones/plan-de-estudios.service";


@Component({
  selector: 'app-asignar-profesor',
  templateUrl: './asignar-profesor.component.html',
  styleUrls: ['./asignar-profesor.component.css']
})
export class AsignarProfesorComponent implements OnInit {
  @ViewChild('cursosModal') cursosModal: ModalComponent;
  @ViewChild('asignaturasModal') asignaturasModal: ModalComponent;
  @ViewChild('confirmModal') confirmModal: ModalComponent;

  id: number;
  private sub: any;

  profesor: any;

  asignaturasDictadas = [];
  selectedAsignatura: any;
  unassignedAsignaturas = [];

  jefaturas = [];
  selectedJefatura: any;
  selectedJefaturaName: string;
  unassignedJefaturas = [];

  allCursos = [];

  allAsignaturas = [];

  planesDeEstudio = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profesoresService: ProfesoresService,
    private cursosService: CursosService,
    private colegiosService: ColegiosService,
    private configuracionService: ConfiguracionService,
    private planesDeEstudiosService: PlanDeEstudiosService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.profesoresService.getProfesorById(this.id).subscribe(prof => {
        this.profesor = prof;
      });

      this.profesoresService.getJefaturasByProfesorId(this.id).subscribe(jefaturas => {
        this.jefaturas=jefaturas;

        if(jefaturas){
          this.cursosService.getCursos().subscribe(cursos => {
            this.allCursos = cursos;

          })
        }
      });

      this.profesoresService.getAsignaturasByProfesorId(this.id).subscribe(asign => {
        this.asignaturasDictadas = asign;
        if(asign){
          this.colegiosService.getAsignaturasByColegioId().subscribe(asignaturas => {
            this.allAsignaturas = asignaturas;


          })
        }
      })
    });

    this.configuracionService.getConfiguraciones().subscribe(configs => {
      let configId = configs.find(c => c.glosa == 'Planes de Estudio y Tipos de Enseñanza' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;

      this.planesDeEstudiosService.getConfigPlanesDeEstudio(configId).subscribe(res => {
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

  selectCurso(cursoId: number){

    this.selectedJefatura = this.allCursos.find(c => c.curso.id==cursoId).curso;
    this.selectedJefaturaName = this.selectedJefatura.grado+' '+this.selectedJefatura.curso;
    this.cursosModalClose();
  }

  unselectCurso(){
    this.selectedJefatura = null;
    this.selectedJefaturaName = '';
  }

  addJefatura(){
    this.jefaturas.push(JSON.parse(JSON.stringify(this.selectedJefatura)));
    this.selectedJefatura = null;
  }

  deleteJefatura(jefId: number){
    let jefaturaIdx = this.jefaturas.findIndex(j => j.id == jefId);
    this.jefaturas.splice(jefaturaIdx,1);
    let unassignedCurso = this.allCursos.find(c => c.curso.id==jefId);
    if(unassignedCurso && unassignedCurso.curso.profesor_id){
      this.unassignedJefaturas.push(unassignedCurso);
    }
  }

  checkCursoInJefaturas(){
    if(!this.selectedJefatura || this.jefaturas.find(j => j.id == this.selectedJefatura.id)){
      return true;
    }
    return false;
  }

  getPlanEstudiosByAsignaturaId(planId: number): string{
    let plan = this.planesDeEstudio.find(p => p.id == planId);
    if(plan){
      return plan.decreto.length>60 ? plan.decreto.substring(0,plan.decreto.length-28)+'...' : plan.decreto;
    }
    return '';


  }

  selectAsignatura(asignaturaId: number){
    this.selectedAsignatura = this.allAsignaturas.find(a => a.id==asignaturaId);
    this.asignaturasModalClose();
  }

  unselectAsignatura(){
    this.selectedAsignatura = null;
  }

  addAsignatura(){
    this.asignaturasDictadas.push(JSON.parse(JSON.stringify(this.selectedAsignatura)));
    this.selectedAsignatura = null;
  }

  deleteAsignatura(asigId: number){
    let asignaturaIdx = this.asignaturasDictadas.findIndex(a => a.id == asigId);
    this.asignaturasDictadas.splice(asignaturaIdx,1);
    let unassignedAsignatura = this.allAsignaturas.find(a => a.id==asigId);
    /*if(unassignedAsignatura){
      this.unassignedJefaturas.push(unassignedCurso);
    }*/
  }

  //Save
  saveJefaturas(){
    this.profesoresService.asignarJefaturasByProfesorId(this.id,this.jefaturas).subscribe(res => {

    })
  }

  saveAsignaturasDictadas(){
    this.profesoresService.asignarAsignaturasByProfesorId(this.id,this.asignaturasDictadas).subscribe(res => {

    })
  }

  save(){
    let checkJefaturas: boolean = false;
    let checkAsignaturas: boolean = false;
    this.profesoresService.asignarJefaturasByProfesorId(this.id,this.jefaturas).subscribe(res => {

      checkJefaturas = true;
      if(checkAsignaturas&&checkJefaturas){
        this.confirmModalOpen();
      }
    });
    this.profesoresService.asignarAsignaturasByProfesorId(this.id,this.asignaturasDictadas).subscribe(res => {

      checkAsignaturas = true;
      if(checkAsignaturas&&checkJefaturas){
        this.confirmModalOpen();
      }
    })
  }

  //modals
  ////Cursos modal
  cursosModalOpen(){
    this.cursosModal.open('sm');
  }

  cursosModalClose(){
    this.cursosModal.close()
  }

  cursosModalDismiss(){
    this.cursosModal.dismiss();
  }
  ////Asignaturas modal
  asignaturasModalOpen(){
    this.asignaturasModal.open('lg');
  }

  asignaturasModalClose(){
    this.asignaturasModal.close();
  }

  asignaturasModalDismiss(){
    this.asignaturasModal.dismiss();
  }
  //confirm modal
  confirmModalOpen(){
    this.confirmModal.open('sm');
  }
  confirmModalClose(){
    this.confirmModal.close();
  }

  goBack(): void {
    //change to router.navigate to navigate to parent route app/libro/ver-cursos
    //this.location.back navigates inside tabs, bad for tab logic.
    this.router.navigate(['./'],{relativeTo: this.route.parent});
  }

}
