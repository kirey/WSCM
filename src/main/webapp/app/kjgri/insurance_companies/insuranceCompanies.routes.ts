import { Routes, RouterModule } from '@angular/router';

import { InsuranceCompaniesCmp } from './insuranceCompanies.cmp';

const routes: Routes = [
    {
        path: '',
        component: InsuranceCompaniesCmp,
    }
];

export const ROUTING = RouterModule.forChild(routes);