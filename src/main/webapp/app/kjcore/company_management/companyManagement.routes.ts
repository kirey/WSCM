import { Routes, RouterModule } from '@angular/router';

import { CompanyManagementCmp } from './companyManagement.cmp';

const routes: Routes = [
    {
        path: '',
        component: CompanyManagementCmp,
    }
];

export const ROUTING = RouterModule.forChild(routes);