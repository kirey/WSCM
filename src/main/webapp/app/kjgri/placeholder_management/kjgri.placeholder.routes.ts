import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PlaceholderManagementCmp } from './kjgri.placeholder.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: PlaceholderManagementCmp
    }
]);