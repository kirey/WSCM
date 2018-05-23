import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AdminEmailConfigsCmp } from './adminEmailConfigs.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: AdminEmailConfigsCmp
    }
]);