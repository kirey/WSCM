import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ConfirmRegistrationCmp } from './confirmRegistration.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ConfirmRegistrationCmp
    }
]);