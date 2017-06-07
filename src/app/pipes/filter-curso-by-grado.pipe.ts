/**
 * Created by matias on 05-04-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Curso array By Grado
@Pipe({ name: 'filterCursoByGrado', pure: false })
export class FilterCursoByGrado implements PipeTransform {
  transform(data, grado: string) {
    if(!data && !grado){
      return data;
    } else {
      return data.filter(item => {
        return !(item.text.indexOf(grado)==-1);
      });
    }
  }
}
