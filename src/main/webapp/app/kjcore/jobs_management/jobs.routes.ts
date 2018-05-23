import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { JobsComponent } from './jobs.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: JobsComponent
    }
]);