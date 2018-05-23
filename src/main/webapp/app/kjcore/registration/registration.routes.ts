import { Routes, RouterModule } from '@angular/router';

import { RegistrationCmp } from './registration.cmp';

const routes: Routes = [
    {
        path: '',
        component: RegistrationCmp
    }
];

export const ROUTING = RouterModule.forChild(routes);