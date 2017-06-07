import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { Location } from '@angular/common';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { ConfiguracionService } from '../../../../services/sistema/configuracion.service';

/** date-fns**/
import {
  format,
  addDays,
  isSameDay,
  isAfter,
  isBefore,} from 'date-fns';

/****/

import {CalendarioService} from '../../../../services/sistema/configuraciones/calendario.service';

@Component({
  selector: 'app-calendario-academico',
  templateUrl: './calendario-academico.component.html',
  styleUrls: ['./calendario-academico.component.css'],
  animations: [
    trigger(
      'fade', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('90ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('90ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class CalendarioAcademicoComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;

  private configId;
  private configuracion = {
    'periodo_academico':{
      'glosa':'',
      'fecha_inicio':null,
      'fecha_termino':null,
    },
    'vacaciones':[
      /*{
        'glosa':'',
        'fecha_inicio':null,
        'fecha_termino':null,
      }*/
    ],
    'fechas_especiales':[
      /*{
        'glosa':'',
        'fecha_inicio':null,
        'fecha_termino':null,
      }*/
    ]
  };

  constructor(
    private location: Location,
    private calendarioService: CalendarioService,
    private configuracionService: ConfiguracionService,
  ) { }

  ngOnInit() {
    this.configuracionService.getConfiguraciones().subscribe(res => {
      this.configId = res.find(c => c.glosa == 'Calendario Académico' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId).id;

      this.calendarioService.getConfigCalendarioAcademico(this.configId).subscribe(res => {
        if(res){
          this.calendarioService.getConfigCalendarioAcademicoById(this.configId).subscribe(subRes => {
            this.configuracion = subRes;

            this.formatDates(this.configuracion);
          })
        } else {
          this.calendarioService.createConfigCalendarioAcademico(this.configId).subscribe(subRes => {
            this.calendarioService.getConfigCalendarioAcademicoById(this.configId).subscribe(subSubRes => {
              this.configuracion = subSubRes;
              this.formatDates(this.configuracion);
            })
          })
        }
      })
    });

  }

  addDays(day: Date,amount: number){
    return format(addDays(day,amount),"DD-MM-YYYY");
  }

  formatDates(config: any){
    for(let key in config.periodo_academico){
      if(key.toString().includes('fecha') && !(typeof config.periodo_academico[key.toString()] === 'boolean') ){
        if(config.periodo_academico[key.toString()]){
          let _b1 = config.periodo_academico[key.toString()].toString().split('T');
          let _b2 = _b1[0].split('-').reverse();
          config.periodo_academico[key.toString()] = _b2.join('-');

        }
      }
    }
    for (let periodo of config.vacaciones){
      for(let key in periodo){
        if(key.toString().includes('fecha') && !(typeof config.periodo_academico[key.toString()] === 'boolean') ){
          if(periodo[key.toString()]){
            let _b1 = periodo[key.toString()].toString().split('T');
            let _b2 = _b1[0].split('-').reverse();
            periodo[key.toString()] = _b2.join('-');

          }
        }
      }
    }
    for (let periodo of config.fechas_especiales){
      for(let key in periodo){
        if(key.toString().includes('fecha') && !(typeof config.periodo_academico[key.toString()] === 'boolean') ){
          if(periodo[key.toString()]){
            let _b1 = periodo[key.toString()].toString().split('T');
            let _b2 = _b1[0].split('-').reverse();
            periodo[key.toString()] = _b2.join('-');

          }
        }
      }
    }
  }

  addVacaciones(){
    this.calendarioService.createEventCalendarioAcademico(true,this.configId).subscribe(res => {
      this.calendarioService.getConfigCalendarioAcademicoById(this.configId).subscribe(subRes => {
        this.formatDates(subRes);
        for(let vacacion of subRes.vacaciones){
          if(this.configuracion.vacaciones.findIndex(v => v.id==vacacion.id)==-1){
            this.configuracion.vacaciones.push(vacacion);
          }
        }
      })
    })
  }

  addFechaEspecial(){
    this.calendarioService.createEventCalendarioAcademico(false,this.configId).subscribe(res => {
      this.calendarioService.getConfigCalendarioAcademicoById(this.configId).subscribe(subRes => {
        this.formatDates(subRes);
        for(let fecha of subRes.fechas_especiales){
          if(this.configuracion.fechas_especiales.findIndex(f => f.id==fecha.id)==-1){
            this.configuracion.fechas_especiales.push(fecha);
          }
        }
      })
    })
  }

  deleteFecha(id: number){
    this.calendarioService.deleteEventCalendarioAcademico(id).subscribe(() => {
      this.calendarioService.getConfigCalendarioAcademicoById(this.configId).subscribe(subRes => {
        this.formatDates(subRes);
        for(let vacacion of this.configuracion.vacaciones){
          let vIdx = subRes.vacaciones.findIndex(v => v.id==vacacion.id);
          if(vIdx==-1){
            this.configuracion.vacaciones.splice(this.configuracion.vacaciones.indexOf(vacacion),1);
          }
        }
        for(let fecha of this.configuracion.fechas_especiales){
          let fIdx = subRes.fechas_especiales.findIndex(f => f.id==fecha.id);
          if(fIdx==-1){
            this.configuracion.fechas_especiales.splice(this.configuracion.fechas_especiales.indexOf(fecha),1);
          }
        }
      })
    })
  }

  saveConfig(){
    this.calendarioService.updateConfigCalendarioAcademico(this.configId,this.configuracion).subscribe(res => {});
    this.modalClose();
  }

  modalOpen(){
    this.modal.open('sm');
  }

  modalClose(){
    this.modal.close();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
