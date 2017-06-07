/**
 * Created by matias on 24-03-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterAsignar' , pure: false})
export class FilterAsignarPipe implements PipeTransform {
  transform(data, type, assigned: any[], unassigned: any[]){
    if(!(type) && !(assigned)){
      return data;
    } else if(data && type=='cursos'){
      let newData = [];
      for(let curso of data){
        let jefatura = assigned.find(j => j.id == curso.curso.id);
        if(!curso.curso.profesor_id && !jefatura){
          newData.push(curso);
        }
      }
      for(let curso of unassigned){
        newData.push(curso);
      }
      return newData;
    } else if(data && type=='asignaturas'){
      let newData =[];
      for(let asignatura of data){
        let dictada = assigned.find(a => a.id == asignatura.id);
        if(!dictada){
          newData.push(asignatura);
        }
      }
      return newData;
    } else return data;
  }
}
