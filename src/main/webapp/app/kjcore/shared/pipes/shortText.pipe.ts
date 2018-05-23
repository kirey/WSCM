import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortText'
})

export class ShortTextPipe implements PipeTransform {
    transform(value: any, sliceNumber: number, sufix?: string): any {
        if (value) {
            if (sufix && value.length <= sliceNumber) {
                sufix = '';
            }
            return value.slice(0, sliceNumber) + (sufix ? sufix : '');
        }
        return value;
    }
}