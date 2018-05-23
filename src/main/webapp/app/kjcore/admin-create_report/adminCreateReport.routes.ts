import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AdminCreateReportCmp } from '../admin-create_report/adminCreateReport.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: AdminCreateReportCmp
    },
    {
        path: ':id',
        component: AdminCreateReportCmp
    }
]);