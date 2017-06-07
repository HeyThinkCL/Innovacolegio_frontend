/**
 * Created by matias on 30-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'filterAsignaturas', pure:false })
export class FilterAsignaturas implements PipeTransform {
  transform(data, asignaturas: any[], planId: number) {
    if(!data && (!asignaturas || !planId)){
      return data;
    } else {
      return data.filter(item => {
        if(item.plan_id==planId){
          for (let asignatura of asignaturas){
            if(asignatura.id==item.asignatura_id){
              return false;
            }
          }
          return true;
        } else return false;
      });
    }
  }
}
