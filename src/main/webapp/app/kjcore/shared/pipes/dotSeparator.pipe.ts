import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dotSeparator'
})

export class DotSeparatorPipe implements PipeTransform {
    transform(value: number): any {
        return value.toLocaleString('de-DE').replace(',','.');
    }
}