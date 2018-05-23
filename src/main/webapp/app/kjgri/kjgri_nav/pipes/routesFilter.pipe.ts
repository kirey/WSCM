import { Pipe, PipeTransform } from '@angular/core';

import { MenuItem } from '../models';

@Pipe({
    name: 'routesFilter'
})

export class RoutesFilterPipe implements PipeTransform {
    transform(value: MenuItem[], userRoutes: Object): any {
        return value.filter((el: MenuItem) => {
            return userRoutes[el.route] || el.allowAll ? true : false;
        })
    }
}