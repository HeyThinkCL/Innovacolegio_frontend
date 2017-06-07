import { Component, OnInit, ViewChild, trigger, transition, style, animate  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }       from '@angular/common';
import { Select2OptionData } from 'ng2-select2';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { PostulacionesService } from '../../../../services/sistema/postulaciones.service';
import { ApoderadosService } from '../../../../services/sistema/apoderados.service';
import { EtniasService } from '../../../../services/sistema/etnias.service';
import { EstadosCivilesService } from '../../../../services/sistema/estados-civiles.service';
import { CursosService } from '../../../../services/libros/cursos.service';

import * as globalVars from '../../../../globals';

@Component({
  selector: 'app-modificar-postulacion',
  templateUrl: './modificar-postulacion.component.html',
  styleUrls: ['./modificar-postulacion.component.css'],
  animations: [
    trigger(
      'fade', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', 'opacity': 1}),
          animate('150ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class ModificarPostulacionComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  //etnias select2
  public selectEtniaData: Array<Select2OptionData> = [];
  public selectEtniaOptions: Select2Options;

  //nacionalidades select2
  public selectNacionalidadData: Array<Select2OptionData> = [];
  public selectNacionalidadOptions: Select2Options;

  //estados civiles select2
  public selectEstadoCivilData: Array<Select2OptionData> = [];
  public selectEstadoCivilOptions: Select2Options;

  private grados = [];

  private postulante:any;
  private padre:any;
  private madre:any;
  private apoderado:any;

  private selectedPostulante:any;
  private selectedPadre:any;
  private selectedMadre:any;
  private selectedApoderado:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private etniasService: EtniasService,
    private estadosCivilesService: EstadosCivilesService,
    private postulacionesService: PostulacionesService,
    private apoderadosService: ApoderadosService,
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.postulante = new Postulante(true);
    this.padre = new Apoderado(true,false,false);
    this.madre = new Apoderado(false,true,false);
    this.apoderado = new Apoderado(false,false,true);

    this.selectedPostulante = new Postulante(true);
    this.selectedPadre = new Apoderado(true,false,false);
    this.selectedMadre = new Apoderado(false,true,false);
    this.selectedApoderado = new Apoderado(false,false,true);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.route.params
      .switchMap((params: Params) => this.postulacionesService.getPostulante(+params['id'])).subscribe((postulante) => {

      if(postulante.prioritario || postulante.preferente){
          postulante['sep']=true;
        }
        this.postulante = postulante;
        this.selectedPostulante = JSON.parse(JSON.stringify(this.postulante));

        this.cursosService.getCursos().subscribe(cursos => {
          for(let c of cursos){
            if(this.grados.length<1 || this.grados.indexOf(c.curso.grado)==-1){
              this.grados.push(c.curso.grado);
            }
          }
        });

        if(postulante.padre_id && postulante.madre_id){
          let pCheck = false;
          let mCheck = false;

          this.apoderadosService.getApoderadoById(postulante.padre_id).subscribe(padre => {
            this.padre = padre;
            this.selectedPadre = JSON.parse(JSON.stringify(this.padre));
            this.padre['apoderado']=false;
            pCheck = true;

            if(this.postulante.apoderado_id && pCheck && mCheck){
              this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
                this.apoderado = apoderado;
                this.selectedApoderado = JSON.parse(JSON.stringify(this.apoderado));

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
            this.selectedMadre = JSON.parse(JSON.stringify(this.madre));
            this.madre['apoderado']=false;
            mCheck = true;

            if(this.postulante.apoderado_id && pCheck && mCheck){
              this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
                this.apoderado = apoderado;
                this.selectedApoderado = JSON.parse(JSON.stringify(this.apoderado));

                if(this.padre.usuario.rut == apoderado.usuario.rut){
                  this.padre.apoderado = true;
                } else if (this.madre.usuario.rut == apoderado.usuario.rut){
                  this.madre.apoderado = true;
                }
              });
            }
          });

        } else if (this.postulante.padre_id && !this.postulante.madre_id){
          this.apoderadosService.getApoderadoById(postulante.padre_id).subscribe(padre => {
            this.padre = padre;
            this.selectedPadre = JSON.parse(JSON.stringify(this.padre));
            this.padre['apoderado']=false;


            if(this.postulante.apoderado_id){
              this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
                this.apoderado = apoderado;
                this.selectedApoderado = JSON.parse(JSON.stringify(this.apoderado));

                if(this.padre.usuario.rut == apoderado.usuario.rut){
                  this.padre.apoderado = true;
                }
              });
            }
          });
        } else if(!this.postulante.padre_id && this.postulante.madre_id){
          this.apoderadosService.getApoderadoById(postulante.madre_id).subscribe(madre => {
            this.madre = madre;
            this.selectedMadre = JSON.parse(JSON.stringify(this.madre));
            this.madre['apoderado']=false;

            if(this.postulante.apoderado_id){
              this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
                this.apoderado = apoderado;
                this.selectedApoderado = JSON.parse(JSON.stringify(this.apoderado));

                if (this.madre.usuario.rut == apoderado.usuario.rut){
                  this.madre.apoderado = true;
                }
              });
            }
          });
        } else if(this.postulante.apoderado_id){
          this.apoderadosService.getApoderadoById(postulante.apoderado_id).subscribe(apoderado => {
            this.apoderado = apoderado;
            this.selectedApoderado = JSON.parse(JSON.stringify(this.apoderado));
          });
        }
      });

    this.selectEtniaData = [{
      id:' ',
      text:'Ninguna'
    }];

    this.etniasService.getEtnias().subscribe(etnias => {
      this.selectEtniaData.pop();
      this.selectEtniaData = [{
        id:' ',
        text:'Ninguna'
      }];
      for (let etnia of etnias){
        this.selectEtniaData.push({
          id: etnia.etnia,
          text: etnia.etnia,
        })
      }
      this.selectEtniaData = JSON.parse(JSON.stringify(this.selectEtniaData));
    });

    this.selectEtniaOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Etnia',
    };

    for (let country of globalVars.countriesArray){
      this.selectNacionalidadData.push({
        id:country.nombre,
        text: country.nombre,
      })
    }

    this.selectNacionalidadOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Nacionalidad',
    };

    this.selectEstadoCivilData = [{
      id:' ',
      text:'Ninguno'
    }];

    this.estadosCivilesService.getEstadosCiviles().subscribe(estados => {
      this.selectEstadoCivilData.pop();
      this.selectEstadoCivilData = [{
        id:' ',
        text:'Ninguno'
      }];
      for (let estado of estados){
        this.selectEstadoCivilData.push({
          id: estado.tipo.toString(),
          text: estado.tipo.toString(),
        })
      }
    });

    this.selectEstadoCivilOptions = {
      closeOnSelect: true,
      placeholder: 'Seleccionar Estado Civil',
    };

  }

  goBack(): void {
    this.location.back();
  }

  onChange(changed: any, other: any) {
    if ( !changed.apoderado && !other.apoderado ) {
      this.apoderado = this.selectedApoderado;
    }

    else if ( changed.apoderado && other.apoderado ) {
      other.apoderado = false;
      this.apoderado = JSON.parse(JSON.stringify(changed));
    }
    else if ( changed.apoderado && !other.apoderado ) {
      this.apoderado = JSON.parse(JSON.stringify(changed));
    }
    else if ( !changed.apoderado && other.apoderado ){
      this.apoderado = JSON.parse(JSON.stringify(other));
    }
  }

  undoChanges(changed: any, original: any){
    changed = JSON.parse(JSON.stringify(original));
  }

  modalOpen(): void {
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.goBack();
  }

  savePostulacion() {

    if(this.padre.apoderado){
      this.apoderado = this.padre;
    } else if (this.madre.apoderado){
      this.apoderado = this.madre;
    }

    this.postulacionesService.updatePostulante(this.postulante).subscribe((post) => {
      this.postulante = JSON.parse(JSON.stringify(post));

      if(this.postulante.padre_id){
        this.apoderadosService.updateApoderado(this.id,this.padre).subscribe(padre => {
          this.padre = JSON.parse(JSON.stringify(padre));
        })
      } else if (this.padre.usuario.rut){
        this.apoderadosService.createApoderado(this.id,this.padre).subscribe();
      }

      if(this.postulante.madre_id){
        this.apoderadosService.updateApoderado(this.id,this.madre).subscribe(madre => {
          this.madre = JSON.parse(JSON.stringify(madre));
        })
      } else if (this.madre.usuario.rut){
        this.apoderadosService.createApoderado(this.id,this.madre).subscribe();
      }

      if(this.postulante.apoderado_id && !(this.madre.apoderado || this.padre.apoderado)){
        this.apoderadosService.updateApoderado(this.id,this.apoderado).subscribe(madre => {
          this.apoderado = JSON.parse(JSON.stringify(madre));
        })
      } else if(this.apoderado.usuario.rut && !(this.madre.apoderado || this.padre.apoderado)){
        this.apoderadosService.createApoderado(this.id,this.apoderado).subscribe();
      }

      this.modalOpen();
    });
  }

}

export class Usuario{
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: number;
  dv: string;
  fono_casa: string;
  fono_movil: string;
  email: string;
  sexo: string;
  nacionalidad: string;
  estado_civil: string;
  fecha_nacimiento: string;

  constructor(){}
}

export class Postulante{
  aceptado: boolean;
  desiste: boolean;
  lista_espera: boolean;
  rechazado: boolean;
  promovido: boolean;
  matriculado: boolean;
  prioritario: boolean;
  vulnerable: boolean;
  preferente: boolean;
  pie: boolean;
  intercambio: boolean;
  excedente: boolean;
  lista: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: number;
  dv: string;
  pasaporte: string;
  etnia: string;
  fono_casa: string;
  fono_movil: string;
  email: string;
  sexo: string;
  nacionalidad: string;
  fecha_nacimiento: string;

  constructor(public postulante: boolean){}
}

export class Apoderado{
  ocupacion: string;
  titulo: string;
  usuario: Usuario;

  constructor(public padre: boolean, public madre: boolean, public apoderado: boolean){
    this.usuario = new Usuario;
  }
}
