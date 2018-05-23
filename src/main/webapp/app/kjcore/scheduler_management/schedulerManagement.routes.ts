import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SchedulerManagementCmp } from './schedulerManagement.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: SchedulerManagementCmp
    }
]);