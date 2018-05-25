import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NestoComponent } from './nesto/nesto.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'nesto', component: NestoComponent },
];

export const AppRoutes: any = RouterModule.forRoot(routes);