/**
 * Created by matias on 30-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'filterProfByAsign', pure: false })
export class FilterProfByAsign implements PipeTransform {
  transform(data, asignId: number) {
    if(!data && !asignId){
      return data;
    } else {
      return data.filter(item => {
        return item.asignaturas.indexOf(asignId) !== -1;
      });
    }
  }
}
