import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PlanManagementCmp } from './kjgri.plan.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: PlanManagementCmp
    }
]);