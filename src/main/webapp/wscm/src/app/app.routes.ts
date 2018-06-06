import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
    { path: 'panel', component: PanelComponent },

    { path: '**', component: PanelComponent }
];

export const AppRoutes: any = RouterModule.forRoot(routes, { useHash: true });