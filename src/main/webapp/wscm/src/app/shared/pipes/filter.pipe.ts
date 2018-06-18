import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
    transform(value: any, filterData: any, type: String) {
        if (value.length == 0) {
            return value;
        }
        else {
            switch (type) {
                case 'categories':
                    let newFilter = [];
                    for (let item of filterData) {
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
}