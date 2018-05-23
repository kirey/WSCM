import { Routes, RouterModule } from '@angular/router';

import { CompanyPanelCmp } from './companyPanel.cmp';

const routes: Routes = [
    {
        path: '',
        component: CompanyPanelCmp,
    }
];

export const ROUTING = RouterModule.forChild(routes);