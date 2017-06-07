/**
 * Created by matias on 11-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

// # Filter Array of Objects
@Pipe({ name: 'filterArray', pure:false })
export class FilterTablePipe implements PipeTransform {
  transform(data, filter, keys: any[]){
    if (!filter || keys.length == 0){
      return data;
    } else if (data && filter && keys.length > 0){
      return data.filter(item => {
        for (let key of keys){
          if (typeof key === 'string' || key instanceof String){
            if (item[key.toString()]){
              if (item[key.toString()].toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1){
               return true;
              }
            }
          } else if (typeof key === 'object' || key instanceof Object){
            if(item[key.mainKey]){
              let mainData = item[key.mainKey];
              for (let subKey of key.subKeys){
                if(typeof subKey === 'string' || subKey instanceof String){
                  if(mainData[subKey.toString()]){
                    if (mainData[subKey.toString()].toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1){
                     return true;
                    }
                  }
                }
              }
            }
          }
        }
        return false;
      });
    }
  }
}
