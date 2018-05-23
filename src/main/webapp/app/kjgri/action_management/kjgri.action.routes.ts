import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ActionManagementCmp } from './kjgri.action.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ActionManagementCmp
    }
]);