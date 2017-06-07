/**
 * Created by matias on 29-03-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'filterConfigs', pure: false })
export class FilterConfigsPipe implements PipeTransform {
  transform(data, colegioId: number) {
    if(!data && !colegioId){
      return data;
    } else {
      return data.filter(item => {
        if(item.colegio_id==colegioId){
        }
        return item.colegio_id==colegioId;
      });
    }
  }
}
