import {Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';

import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";

import {CursosService} from "../../../../services/libros/cursos.service";

@Component({
  selector: 'app-modificar-electivo',
  templateUrl: './modificar-electivo.component.html',
  styleUrls: ['./modificar-electivo.component.css']
})
export class ModificarElectivoComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  id: number;
  private sub: any;

  private electivo: any;
  private selectedAlumnos = [];
  private initSelectedAlumnos = [];
  private cursos = [];

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.cursosService.getElectivoById(+params['id']))
      .subscribe((res) => {
        this.electivo = res.electivo;
        this.cursos = res.cursos;

        this.selectedAlumnos = res.alumnos;
        this.initSelectedAlumnos = JSON.parse(JSON.stringify(res.alumnos));
      });
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
    let sacarAlumnoId = [];
    for(let id of this.initSelectedAlumnos){
      if(!this.include(this.selectedAlumnos,id)){
        sacarAlumnoId.push(id);
      }
    }

    this.cursosService.updateElectivo(this.id,this.selectedAlumnos,sacarAlumnoId).subscribe(res => {
      this.cursosService.getElectivoById(this.id).subscribe(response => {
        this.electivo = response.electivo;
        this.cursos = response.cursos;

        this.selectedAlumnos = response.alumnos;
        this.initSelectedAlumnos = JSON.parse(JSON.stringify(response.alumnos));
        this.modalOpen();
      })
    });
  }

  goBack(): void {
    this.location.back();
  }

  //modal
  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

}
