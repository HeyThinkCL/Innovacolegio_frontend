import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
/** date-fns**/
import {
  differenceInDays,
  startOfWeek,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  startOfDay,
  isSameDay,
  isAfter,
  isBefore,
  getDay,} from 'date-fns';

/****/

import {ConfiguracionService} from '../../../../../services/sistema/configuracion.service';
import {CalendarioService} from '../../../../../services/sistema/configuraciones/calendario.service';
import {AsistenciaService} from '../../../../../services/libros/asistencia.service';
import {RedirectService} from '../../../../../services/redirect.service'

@Component({
  selector: 'app-curso-asistencia-ver',
  templateUrl: 'curso-asistencia-ver.component.html',
  styleUrls: ['curso-asistencia-ver.component.css']
})
export class CursoAsistenciaVerComponent implements OnInit {
  @ViewChild('modal')
  modal: ModalComponent;

  id: number;
  private sub: any;

  viewDate: Date;
  weekStartsOn: number;
  view: any;

  inasistenciaMonth = [];
  month = [];
  selectedDay: any;

  private calendarConfig: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private configuracionService: ConfiguracionService,
    private calendarioService: CalendarioService,
    private asistenciaService: AsistenciaService,
    private redirectService: RedirectService,
  ) { }

  ngOnInit() {

    this.viewDate = new Date();

    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.id = params['id'];
      this.asistenciaService.getInasistenciasByMonth(this.id,startOfMonth(this.viewDate)).subscribe(res => {
        for (let dia of res.mes){
          dia.dia = addDays(new Date(dia.dia),1);
        }
        this.inasistenciaMonth = res.mes;

        this.configuracionService.getConfiguraciones().subscribe(configs => {
          let config = configs.find(c => c.glosa == 'Calendario Académico' && c.colegio_id == +JSON.parse(localStorage.getItem('currentUser')).colegioId);
          this.calendarioService.getConfigCalendarioAcademicoById(config.id).subscribe(subRes => {
            if(subRes && subRes.periodo_academico && (subRes.periodo_academico.fecha_inicio && subRes.periodo_academico.fecha_termino)){

              this.calendarConfig = subRes;
              this.view = this.getMonthView({
                viewDate: this.viewDate,
              });
            } else {
              let currentRol = +atob(atob(JSON.parse(localStorage.getItem('currentUser')).rol))[5];
              if(currentRol==4||currentRol==5){
                this.router.navigate(['app/alerta-configuracion',1]);
              } else {
                this.router.navigate(['app/sistema/configuracion/calendario']);
              }
            }
          }, error => {
            if(error==500) {
              this.redirectService.onServerError500();
            }
          });
        }, error => {
          if(error==500) {
            this.redirectService.onServerError500();
          }
        });
      }, error => {
        if(error==500) {
          this.redirectService.onServerError500();
        }
      })
    }, error => {
      if(error==500) {
        this.redirectService.onServerError500();
      }
    });

    this.selectedDay = {'day': new Date() ,'cant':0,'alumnos':[]};
  }

  //modal
  modalOpen(day: Date): void {
    this.selectedDay = this.setSelectedDay(day);
    this.modal.open();
  }

  modalClose(): void {
    this.modal.close();
    this.selectedDay = {'dia': new Date() ,'alumnos':[]};
  }


  setSelectedDay(day: Date): any{
    return this.inasistenciaMonth.find(res => res.dia.toDateString() == day.toDateString());
  }

  //date data
  inPeriodoAcademico(day: Date){
    let start = this.calendarConfig.periodo_academico.fecha_inicio;
    let end = this.calendarConfig.periodo_academico.fecha_termino;
    return ((isAfter(day,start) && isBefore(day,end)) || isSameDay(day,start) || isSameDay(day,end))
  }

  inVacacion(day: Date){
    for(let periodo of this.calendarConfig.vacaciones){
      if((isAfter(day,periodo.fecha_inicio) && isBefore(day,periodo.fecha_termino)) || isSameDay(day,periodo.fecha_inicio) || isSameDay(day,periodo.fecha_termino)){
        return true;
      }
    }
    return false;
  }

  isEspecial(day: Date){
    for(let fecha of this.calendarConfig.fechas_especiales){
      if(isSameDay(day,fecha.fecha_inicio)){
        return true;
      }
    }
    return false;
  }

  isFeriado(day: Date){
    for(let feriado of this.calendarConfig.feriados){
      if(isSameDay(day,feriado.fecha_inicio)){
        return true;
      }
    }
    return false;
  }

  getInasistenciaByDia(day: Date): number{
    let cant: number;
    if( this.inasistenciaMonth.find(res => res.dia.toDateString() == day.toDateString()) ){
      cant = this.inasistenciaMonth.find(res => res.dia.toDateString() == day.toDateString()).alumnos.length;
    } else {
      cant = 0;
    }
    return cant;
  }

  //calendar rendering
  getMonthView: Function = ({viewDate, weekStartsOn}:
    {viewDate: Date, weekStartsOn: number})
    : MonthView => {

    const start: Date = startOfWeek(startOfMonth(viewDate), {weekStartsOn});
    const end: Date = endOfWeek(endOfMonth(viewDate), {weekStartsOn});

    const days: MonthViewDay[] = [];
    for (let i: number = 0; i < differenceInDays(end, start) + 1; i++) {
      const date: Date = addDays(start, i);
      const day: MonthViewDay = getWeekDay({date});

      day.inMonth = isSameMonth(date, viewDate);
      day['inPeriodoAcademico'] = this.inPeriodoAcademico(date);
      day['inVacacion'] = this.inVacacion(date);
      day['isEspecial'] = this.isEspecial(date);
      day['isFeriado'] = this.isFeriado(date);
      days.push(day);
    }

    const rows: number = Math.floor(days.length / 7);
    const rowOffsets: number[] = [];
    for (let i: number = 0; i < rows; i++) {
      rowOffsets.push(i * 7);
    }

    return {
      rowOffsets,
      days
    };

  };

  increment(): void {
    this.inasistenciaMonth = [];
    this.viewDate = addMonths(this.viewDate,1);

    this.asistenciaService.getInasistenciasByMonth(this.id,startOfMonth(this.viewDate)).subscribe(res => {
      for (let dia of res.mes){
        dia.dia = addDays(new Date(dia.dia),1);
      }
      this.inasistenciaMonth = res.mes;
      this.view = this.getMonthView({
        viewDate: this.viewDate,
        weekStartsOn: this.weekStartsOn
      });
    })
  }

  decrement(): void {
    this.inasistenciaMonth = [];
    this.viewDate = subMonths(this.viewDate,1);

    this.asistenciaService.getInasistenciasByMonth(this.id,startOfMonth(this.viewDate)).subscribe(res => {
      for (let dia of res.mes){
        dia.dia = addDays(new Date(dia.dia),1);
      }
      this.inasistenciaMonth = res.mes;
      this.view = this.getMonthView({
        viewDate: this.viewDate,
        weekStartsOn: this.weekStartsOn
      });
    })
  }

  today(): void {
    this.viewDate = new Date();
  }

  getDayName(dayNumber: number){
    let dayNames =[
      {'id':0,'name':'Dom'},
      {'id':1,'name':'Lun'},
      {'id':2,'name':'Mar'},
      {'id':3,'name':'Mie'},
      {'id':4,'name':'Jue'},
      {'id':5,'name':'Vie'},
      {'id':6,'name':'Sab'},
    ];

    return dayNames.find(day => day.id == dayNumber).name;
  };

  getMonthName(monthNumber: number){
    let monthNames =[
      {'id':0,'name':'Enero'},
      {'id':1,'name':'Febrero'},
      {'id':2,'name':'Marzo'},
      {'id':3,'name':'Abril'},
      {'id':4,'name':'Mayo'},
      {'id':5,'name':'Junio'},
      {'id':6,'name':'Julio'},
      {'id':7,'name':'Agosto'},
      {'id':8,'name':'Septiembre'},
      {'id':9,'name':'Octubre'},
      {'id':10,'name':'Noviembre'},
      {'id':11,'name':'Diciembre'},
    ];

    return monthNames.find(day => day.id == monthNumber).name;
  };

}

export interface MonthView {
  rowOffsets: number[];
  days: MonthViewDay[];
}

export interface MonthViewDay extends WeekDay {
  inMonth: boolean;
  backgroundColor?: string;
  cssClass?: string;
  badgeTotal: number;
}

export interface WeekDay {
  date: Date;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
  isWeekend: boolean;
}

const WEEKEND_DAY_NUMBERS: number[] = [0, 6];

const getWeekDay: Function = ({date}: {date: Date}): WeekDay => {
  const today: Date = startOfDay(new Date());
  return {
    date,
    isPast: date < today,
    isToday: isSameDay(date, today),
    isFuture: date > today,
    isWeekend: WEEKEND_DAY_NUMBERS.indexOf(getDay(date)) > -1
  };
};
