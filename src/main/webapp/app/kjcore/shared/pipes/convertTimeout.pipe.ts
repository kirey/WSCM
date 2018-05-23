import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertTimeout'
})

export class ConvertTimeoutPipe implements PipeTransform {
    transform(value: number): any {
        let h, m, s;
        s = Math.floor(value / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;

        return ((h<10)?"0"+h:h) + ":" + ((m<10)?"0"+m:m) + ":" + ((s<10)?"0"+s:s);
    }
}