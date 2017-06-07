import {Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";

import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";
import {Select2OptionData} from "ng2-select2";

import {CursosService} from "../../../../services/libros/cursos.service";

@Component({
  selector: 'app-crear-electivo',
  templateUrl: './crear-electivo.component.html',
  styleUrls: ['./crear-electivo.component.css']
})
export class CrearElectivoComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  private electivo = {
    'nombre':null,
  };

  cursos = [];
  selectedCursos = [];
  selectedAlumnos = [];

  public selectCursosData: Array<Select2OptionData> = [];
  public selectCursosOptions: Select2Options;
  public selectCursosRender: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.cursosService.getCursos().subscribe((cursos) => {
      if(cursos && cursos.length>0){
        this.cursos = cursos;
        for(let curso of this.cursos){
          this.selectCursosData.push({
            id:curso.curso.id,
            text:`${curso.curso.grado} ${curso.curso.curso}`
          })
        }
        this.selectCursosRender = true;
      }
    });

    this.selectCursosOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Curso(s)',
      multiple: true,
    };
  }

  cursosChanged(value: any){
    if(value && value.length>0){
      for(let id of value){
        if(!this.selectedCursos.find(c => c.curso.id== +id)){
          let selectedCurso = {
            'curso':this.cursos.find(c => c.curso.id == +id).curso,
            'alumnos':[]
          };
          this.cursosService.getCursoById(+id).subscribe(curso => {
            selectedCurso.alumnos = curso.alumnos;
            this.selectedCursos.push(selectedCurso);
          })
        }
      }
    }
    for(let curso of this.selectedCursos){
      if(!value){
        this.selectedCursos.pop();
        this.selectedAlumnos = [];
      } else{
        if(!value.find(v => +v==curso.curso.id)){
          for(let alumno of curso.alumnos){
            if (this.include(this.selectedAlumnos,alumno.id)){
              this.selectedAlumnos.splice(this.selectedAlumnos.indexOf(alumno.id),1);
            }
          }
          let cursoIdx = this.selectedCursos.findIndex(c => c.curso.id==curso.curso.id);
          this.selectedCursos.splice(cursoIdx,1);
        }
      }
    }
  }


  selectAlumno(id){
    if (this.include(this.selectedAlumnos,id)){
      this.selectedAlumnos.splice(this.selectedAlumnos.indexOf(id),1);
    } else {
      this.selectedAlumnos.push(id);
    }
  }

  include(arr,obj) {
    return (arr.indexOf(obj) != -1);
  }

  saveElectivo(){
    let cursosToAssign = [];
    for(let curso of this.selectedCursos){
      cursosToAssign.push(curso.curso.id);
    }
    this.cursosService.createElectivo(this.electivo, cursosToAssign).subscribe(asignatura => {
      this.cursosService.addAlumnosToElectivo(asignatura.id,this.selectedAlumnos).subscribe(res => {
        this.modalOpen();
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
  }

}
