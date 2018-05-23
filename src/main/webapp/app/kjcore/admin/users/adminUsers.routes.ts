import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AdminUsersCmp } from './adminUsers.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: AdminUsersCmp
    }
]);