/**
 * Created by matias on 28-12-16.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcPromedio',
  pure: false,
})
export class CalcPromedio implements PipeTransform {
  transform(notas: any[],info_notas: any[], config: any) {
    let sum: number = 0;
    let total: number = 0;
    if(notas&&info_notas&&config){
      for(let ixx in notas){
        let nota = notas[ixx];
        let coef: number;
        if(info_notas[ixx]){
          if(info_notas[ixx].coeficiente){
            coef = info_notas[ixx].coeficiente;
          }
        } else {
          coef = 1;
        }
        if(nota.valor){
          for(let i:number = 0;i<coef;i++){
            sum += +nota.valor;
            total += 1;
          }
        }
      }
    }
    if(!(config.notas.aprox)){
      return isNaN(sum/total)? 1.0 : this.round(sum/total,config.notas.decimales) ;
    } else {
      return isNaN(sum/total)? 1.0 : sum/total ;
    }

  }

  round(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.floor(value * multiplier) / multiplier;
  }
}


