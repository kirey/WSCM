import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(input: any[], values: any): any {
        if (values.value != null && values.value != '' && values.value != undefined) {
            return input.filter(el => {
                return (el.reportName.indexOf(values.value) !== -1 || (el.reportDescription != null) ? (el.reportDescription.indexOf(values.value) !== -1) : false)
            });
        }
        return input;
    }
}