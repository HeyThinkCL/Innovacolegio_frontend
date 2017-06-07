/**
 * Created by matias on 04-04-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includeProfesor',
  pure: false,
})
export class IncludeProfesorPipe implements PipeTransform{
  transform(value, rolesDocentes: any[]) {
    if(!rolesDocentes || rolesDocentes.length<1){
      return value;
    } else {
      return !(rolesDocentes.indexOf('profesor')==-1);
    }
  }
}
