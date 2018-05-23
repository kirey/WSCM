import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bytes'
})
export class BytesConverterPipe implements PipeTransform {
    transform(value: number): string {
        let tempValue = value / 1024;

        if (tempValue < 1) {
            return value + ' B';

        } else if(tempValue / 1024 < 1){
            return (tempValue).toFixed(2) + ' KB';
        } else {
            return (tempValue / 1024).toFixed(2) + ' MB';
        }
    }
}