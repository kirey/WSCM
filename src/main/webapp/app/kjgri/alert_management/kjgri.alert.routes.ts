import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AlertManagementCmp } from './kjgri.alert.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: AlertManagementCmp
    }
]);