import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { KJGriLandingCmp } from './kjgri.landing.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: KJGriLandingCmp
    }
]);