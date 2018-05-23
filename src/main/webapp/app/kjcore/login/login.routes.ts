import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginCmp } from './login.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: LoginCmp
    }
]);