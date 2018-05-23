import { RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';

import { HomeCmp } from './home.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: HomeCmp
    }
]);