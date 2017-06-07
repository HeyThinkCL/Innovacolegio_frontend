/**
 * Created by matias on 16-05-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'limitCursos' , pure: false})
export class LimitCursosPipe implements PipeTransform {
  transform(value){
    if(value && typeof value === 'number'){
      if(value<1){
        return 1
      } else if(value> 26){
        return 26
      } else if (!Number.isInteger(value)){
        return Math.trunc(value);
      }
    } else if(Number.isNaN(value)){
      return 1;
    } else if(value === null){
      return 1;
    }
  }
}
