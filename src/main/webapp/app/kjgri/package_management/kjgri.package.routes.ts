import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PackageManagementCmp } from './kjgri.package.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: PackageManagementCmp
    }
]);