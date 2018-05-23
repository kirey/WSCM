import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'seconds'
})

export class SecondsFromNanoPipe implements PipeTransform {
    transform(value: any): any {
        return (value/1000000000).toFixed(3) + 's';
    }
}