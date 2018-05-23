import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ActivateUserCmp } from './activateUser.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ActivateUserCmp
    }
]);