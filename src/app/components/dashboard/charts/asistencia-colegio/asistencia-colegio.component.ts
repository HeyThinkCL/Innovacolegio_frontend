import { Component, OnInit } from '@angular/core';

import {DashboardService} from '../../../../services/dashboard.service'

@Component({
  selector: 'app-asistencia-colegio',
  templateUrl: './asistencia-colegio.component.html',
  styleUrls: ['./asistencia-colegio.component.css']
})
export class AsistenciaColegioComponent implements OnInit {

  private data: any;

  private renderChart:boolean = false;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartColors:any[] = [];

  public barChartData:any[] = [
    // {data: [65, 59, 80], label: 'Series A'},
  ];

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {
    this.dashboardService.getAsistenciasColegio().subscribe(res => {
      this.data = res;
      if(this.data && this.data.length>0){
        let meses = JSON.parse(JSON.stringify(this.data[0].asistencia));
        meses.reverse();
        for(let mes of meses){
          if(this.barChartLabels.length<4){
            this.barChartLabels.push(mes.mes)
          }
        }
        this.barChartLabels.reverse();

        for(let dat of this.data){
          let l = `${dat.curso.grado} ${dat.curso.curso}`;
          let d = [];
          for(let mes of this.barChartLabels){
            d.push(dat.asistencia.find(m => m.mes==mes).porcentaje);
          }
          this.barChartData.push({
            data:d,label:l
          })
        }
        this.generateColors();
      }
    })
  }

  generateColors(){
    let total = this.barChartData.length;
    if(total>0){
      for(let d in this.barChartData){
        let rgba = `rgba(${52 + Math.trunc((231-52)*(+d/total))},${152 - Math.trunc((152-76)*(+d/total))},${219 - Math.trunc((219-60)*(+d/total))}`;
        this.barChartColors.push({
          backgroundColor:`${rgba},0.65)`,
          borderColor:`${rgba},0.8)`,
          hoverBackgroundColor:`${rgba},0.75)`,
          hoverBorderColor:`${rgba},1)`,
        })
      }
    }
    this.renderChart = true;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
