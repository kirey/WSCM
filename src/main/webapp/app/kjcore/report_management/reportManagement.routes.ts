import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ReportManagementCmp } from './reportManagement.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ReportManagementCmp
    }
]);