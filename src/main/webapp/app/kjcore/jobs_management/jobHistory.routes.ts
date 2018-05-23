import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { JobHistoryCmp } from './jobHistory.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: JobHistoryCmp
    }
]);