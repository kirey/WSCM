import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(value: any, filter: any) {
        if (value.length == 0) {
            return value;
        }
        else {
            let newFilter = [];
            for (let item of filter) {
                newFilter.push(item['categories']);
            }
            let res = value.filter(function (obj) {
                return !newFilter.some(function (obj2) {
                    return obj.id == obj2.id;
                });
            });
            return res;
        }
    }
}