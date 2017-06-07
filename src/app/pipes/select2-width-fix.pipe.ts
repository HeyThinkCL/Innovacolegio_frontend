/**
 * Created by matias on 24-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'select2WidthFix'})
export class Select2WidthFixPipe implements PipeTransform {
  transform(value: number, elementId: string) {
    if(elementId){
      let element = document.getElementById(elementId);
      return element? element.offsetWidth*.9 : value;
    }
    else return value;

  }
}
