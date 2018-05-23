import { Routes, RouterModule } from '@angular/router';

import { UserPanelCmp } from './userPanel.cmp';


const routes: Routes = [
    {
        path: '',
        component: UserPanelCmp,
    }
];

export const ROUTING = RouterModule.forChild(routes);