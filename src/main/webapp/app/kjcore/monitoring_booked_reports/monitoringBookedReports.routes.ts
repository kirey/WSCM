import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MonitoringBookedReportsCmp } from './monitoringBookedReports.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: MonitoringBookedReportsCmp
    }
]);