import { RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

import { KJGriHomeCmp } from './kjgri.home.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: KJGriHomeCmp
    }
]);