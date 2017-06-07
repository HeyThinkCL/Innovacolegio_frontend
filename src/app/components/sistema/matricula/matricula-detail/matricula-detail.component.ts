import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }       from '@angular/common';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { connectionErrorMsg, invalidRequestMsg } from '../../../spinner/spinner.component';

import { Alumno, Apoderado } from '../matricula';
import { MatriculaService } from '../../../../services/sistema/matricula.service';
import { ApoderadosService } from '../../../../services/sistema/apoderados.service';

import { CursosService } from '../../../../services/libros/cursos.service';

@Component({
  selector: 'app-matricula-detail',
  templateUrl: 'matricula-detail.component.html',
  styleUrls: ['matricula-detail.component.css']
})
export class MatriculaDetailComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  private alumno: any;
  private padre: any;
  private madre: any;
  private apoderado: any;

  timeoutMessage: string;
  private curso: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cursosService: CursosService,
    private matriculaService: MatriculaService,
    private apoderadosService: ApoderadosService,
  ) { }

  ngOnInit() {

    this.timeoutMessage = connectionErrorMsg();

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.matriculaService.getMatricula(+params['id']))
      .subscribe((postulante) => {
        this.alumno = postulante;

        this.cursosService.getCursos().subscribe(c => {
          this.curso = c.find(curso => curso.curso.id == this.alumno.curso_id);
        });

        if(!(postulante)){
          this.timeoutMessage = invalidRequestMsg();
        }

        if(this.alumno.prioritario || this.alumno.preferente){
          this.alumno['sep']=true;
        }

        if(this.alumno.padre_id && this.alumno.madre_id){

          let pCheck = false;
          let mCheck = false;

          this.apoderadosService.getApoderadoById(postulante.padre_id).subscribe(padre => {
            this.padre = padre;
            this.padre['apoderado']=false;
            pCheck = true;
            if(this.alumno.apoderado_id &&  pCheck && mCheck){
              this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
                this.apoderado = apoderado;
                if(this.padre.usuario.rut == apoderado.usuario.rut){
                  this.padre.apoderado = true;
                } else if (this.madre.usuario.rut == apoderado.usuario.rut){
                  this.madre.apoderado = true;
                }
              });
            }
          });

          this.apoderadosService.getApoderadoById(postulante.madre_id).subscribe(madre => {
            this.madre = madre;
            this.madre['apoderado']=false;
            mCheck = true;
            if(this.alumno.apoderado_id && pCheck && mCheck){
              this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
                this.apoderado = apoderado;
                if(this.padre.usuario.rut == apoderado.usuario.rut){
                  this.padre.apoderado = true;
                } else if (this.madre.usuario.rut == apoderado.usuario.rut){
                  this.madre.apoderado = true;
                }
              });
            }
          });

        } else if(this.alumno.padre_id && !this.alumno.madre_id){
          this.apoderadosService.getApoderadoById(postulante.padre_id).subscribe(padre => {
            this.padre = padre;
            this.padre['apoderado']=false;

            if(this.alumno.apoderado_id){
              this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
                this.apoderado = apoderado;
                if(this.padre.usuario.rut == apoderado.usuario.rut){
                  this.padre.apoderado = true;
                }
              });
            }
          });
        } else if(this.alumno.madre_id && !postulante.padre_id){
          this.apoderadosService.getApoderadoById(postulante.madre_id).subscribe(madre => {
            this.madre = madre;
            this.madre['apoderado']=false;

            if(this.alumno.apoderado_id){
              this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
                this.apoderado = apoderado;
                if (this.madre.usuario.rut == apoderado.usuario.rut){
                  this.madre.apoderado = true;
                }
              });
            }
          });
        } else if(this.alumno.apoderado_id){
          this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
            this.apoderado = apoderado;
          });
        }

      });
  }

  goBack(): void {
    this.location.back();
  }

  goToEdit(id: number){
    this.router.navigate(['editar',id],{relativeTo: this.route.parent});

  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.deleteMatricula();
  }

  modalDismiss(): void {
    this.modal.dismiss();
  }

  deleteMatricula(): void {
    this.matriculaService.deleteMatricula(this.alumno.id).subscribe(()=>{
      this.modal.close();
      this.goBack();
    });
  }

}
