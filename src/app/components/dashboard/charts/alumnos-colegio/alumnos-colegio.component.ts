import { Component, OnInit } from '@angular/core';
import {CursosService} from "../../../../services/libros/cursos.service";

@Component({
  selector: 'app-alumnos-colegio',
  templateUrl: './alumnos-colegio.component.html',
  styleUrls: ['./alumnos-colegio.component.css']
})
export class AlumnosColegioComponent implements OnInit {

  private cursos = [];

  private renderChart = false;

  private chartLabeledData = [];

  // Doughnut
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  // public doughnutChartType:string = 'doughnut';
  public doughnutChartType:string = 'pie';
  public doughnutChartOptions:any = {
    responsive: true
  };

  public doughnutChartColors:Array<any> = [];

  constructor(
    private cursosService: CursosService,
  ) { }

  ngOnInit() {
    this.cursosService.getCursos().subscribe(cursos => {
      if(cursos){
        this.cursos = cursos;
        for(let c of cursos){
          this.cursosService.getCursoById(c.curso.id).subscribe(curso => {
            if(curso){
              c['alumnos'] = curso.alumnos.length;
              this.chartLabeledData.push({
                curso:`${c.curso.grado} ${c.curso.curso}`,
                cant:c.alumnos
              });

              if(this.chartLabeledData.length==this.cursos.length){
                this.sortCursos();
              }
            }
          })
        }
      }
    })
  }

  sortCursos(){
    this.chartLabeledData.sort(this.compareCursos);

    for(let d of this.chartLabeledData){
      this.doughnutChartLabels.push(d.curso);
      this.doughnutChartData.push(d.cant);
    }
    this.generateColors();
  }

  compareCursos(a,b){
    if(a.cant < b.cant){
      return -1;
    }
    if(a.cant > b.cant){
      return 1;
    }
    return 0;
  }

  generateColors(){
    let total = this.doughnutChartData.length;
    this.doughnutChartColors.push({
      backgroundColor: [],
      hoverBackgroundColor: []
    });
    if(total>0){
      for(let d in this.doughnutChartData){
        let rgba = `rgba(${52 + Math.trunc(1*(+d/total))},${152  + Math.trunc((207-152)*(+d/total))},${219 - Math.trunc((219-118)*(+d/total))}`;
        this.doughnutChartColors[0].backgroundColor.push(`${rgba},0.8)`);
        this.doughnutChartColors[0].hoverBackgroundColor.push(`${rgba},1)`);
      }
    }
    this.renderChart = true;
  }

  getTotalAlumnos(): number{
    let _total: number = 0;
    for(let d of this.doughnutChartData){
      _total = _total + d;
    }
    return _total;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
