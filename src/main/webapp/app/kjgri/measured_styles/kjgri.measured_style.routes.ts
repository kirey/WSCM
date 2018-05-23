import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MeasuredStyleCmp } from './kjgri.measured_style.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: MeasuredStyleCmp
    }
]);