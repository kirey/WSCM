import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GenericsCmp } from './generics.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: GenericsCmp
    }
]);