import { Routes, RouterModule } from '@angular/router';

import { AdminRoutesCmp } from './adminRoutes.cmp';

const routes: Routes = [
    {
        path: '',
        component: AdminRoutesCmp,
    }
];

export const ROUTING = RouterModule.forChild(routes);