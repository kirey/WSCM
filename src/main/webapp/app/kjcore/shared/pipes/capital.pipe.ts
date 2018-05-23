import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capital'
})
export class CapitalPipe implements PipeTransform {
    transform(value: string) : string {
        if(value) return value.substring(0, 1).toUpperCase()+value.substring(1, value.length).toLowerCase();
    }
}