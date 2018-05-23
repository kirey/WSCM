import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trimExtension'
})

export class FileExtensionTrimmer implements PipeTransform {
    transform(value: any): any {
        let splittedValue = value.split('.');
        if (splittedValue.length > 1) {
            return splittedValue[0];
        } else {
            return splittedValue.slice(0, splittedValue.length - 2).join('.');
        }
    }
}