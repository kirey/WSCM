import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GeolocationManagementCmp } from './geolocationManagement.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: GeolocationManagementCmp
    }
]);