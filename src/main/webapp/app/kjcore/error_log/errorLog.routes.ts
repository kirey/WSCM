import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ErrorLogCmp } from './errorLog.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ErrorLogCmp
    }
]);