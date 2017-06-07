/**
 * Created by matias on 03-01-17.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncateTextPipe {
  transform(value: string, args: string[]) : string {
    let limit = args.length > 0 ? parseInt(args[0], 10) : 40;
    let trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
