import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { KJGriAdminUsersCmp } from './kjgri.adminUsers.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: KJGriAdminUsersCmp
    }
]);