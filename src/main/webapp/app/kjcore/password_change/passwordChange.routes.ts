import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PasswordChangeCmp } from './passwordChange.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: PasswordChangeCmp
    }
]);