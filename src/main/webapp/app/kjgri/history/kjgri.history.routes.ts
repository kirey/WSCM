import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { KJGriHistoryCmp } from './kjgri.history.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: KJGriHistoryCmp
    },
    {
        path: ':locationId',
        component: KJGriHistoryCmp
    },
    {
        path: ':locationId/:companyId',
        component: KJGriHistoryCmp
    }
]);