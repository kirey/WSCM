import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class ReportFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any {
        if (args == 'all') {
            return value;
        } else {
            return value.filter((el) => {
                return args == el.type;
            });
        }
    }
}