import { Routes, RouterModule } from '@angular/router';

import { ClientCompaniesCmp } from './clientCompanies.cmp';

const routes: Routes = [
    {
        path: '',
        component: ClientCompaniesCmp,
    }
];

export const ROUTING = RouterModule.forChild(routes);