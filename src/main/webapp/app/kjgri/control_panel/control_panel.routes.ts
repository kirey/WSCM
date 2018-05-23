import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ControlPanelCmp } from './control_panel.cmp';

export const ROUTING: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: ControlPanelCmp
    }
]);