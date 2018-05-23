import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AdminEmailTemplateCmp } from './adminEmailTemplate.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: AdminEmailTemplateCmp
    }
]);