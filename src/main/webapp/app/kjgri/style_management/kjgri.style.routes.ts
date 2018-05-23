import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { StyleManagementCmp } from './kjgri.style.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: StyleManagementCmp
    }
]);