import { Routes, RouterModule } from '@angular/router';

import { ClassLoadingCmp } from './classLoading.cmp';
import { CategoriesCmp } from './categories/categories.cmp';

const routes: Routes = [
    {
        path: '',
        component: ClassLoadingCmp,
    },
    {
        path: 'categories',
        component: CategoriesCmp
    }
];

export const ROUTING = RouterModule.forChild(routes);