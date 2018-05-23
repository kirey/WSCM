import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AdminRolesCmp } from './adminRoles.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: AdminRolesCmp
    }
]);