import { Routes, RouterModule } from '@angular/router';

import { AdminTranslationCmp } from './adminTranslation.cmp';

const routes: Routes = [
    {
        path: '',
        component: AdminTranslationCmp,
    }
];

export const ROUTING = RouterModule.forChild(routes);