import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },

    { path: '**', component: HomeComponent }
];

export const AppRoutes: any = RouterModule.forRoot(routes, { useHash: true });