/**
 * Created by matias on 29-03-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colegioImgFilter',
  pure: false,
})
export class ColegioImgFilterPipe implements PipeTransform {
  transform(data,colegios){
    let colegioId = JSON.parse(localStorage.getItem('currentUser')).colegioId;
    if(data && colegios){
      if(colegios instanceof Array && colegios.length>0){
        let selectedColegio = colegios.find(c => c.img==data);
        if(!(selectedColegio.id==colegioId)){
          let _colegio = colegios.find(c => c.id == colegioId);
          if(_colegio){
            return _colegio.img;
          }
        } else {
          return data;
        }
      } else return data;
    } else return data;

  }
}
