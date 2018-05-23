import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterDropdown'

})

export class FilterDropdown implements PipeTransform {
    transform(items: any[], filter: any, field?: any): any {
        if (filter == "" || !items) {
            return items;
        } else {
            return items.filter(item => {
                if (field) {
                    return item[field].toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
                } else {
                    return item.toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
                }
            })
        }
    }
}