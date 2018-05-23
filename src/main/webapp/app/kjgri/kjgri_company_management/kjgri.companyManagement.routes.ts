import { Routes, RouterModule } from '@angular/router';

import { KJGriCompanyManagementCmp } from './kjgri.companyManagement.cmp';

const routes: Routes = [
    {
        path: '',
        component: KJGriCompanyManagementCmp,
    }
];

export const ROUTING = RouterModule.forChild(routes);