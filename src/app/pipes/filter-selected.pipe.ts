/**
 * Created by matias on 11-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'FilterSelected', pure:false })
export class FilterSelectedPipe implements PipeTransform {
  transform(data, filter){
    if (!(filter.length>0)){
      return data;
    } else if (data && filter){
      return data.filter(item => {
        if(item.curso){
          return !(filter.findIndex(f => f==item.curso.id)==-1);
        }
        return !(filter.findIndex(f => f==item.id)==-1);
      });
    }
  }
}
