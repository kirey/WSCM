import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'content', component: ContentComponent },
    { path: 'home', component: HomeComponent },

    { path: '**', component: HomeComponent }
];

export const AppRoutes: any = RouterModule.forRoot(routes, { useHash: true });