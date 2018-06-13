import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { LanguagesComponent } from './languages/languages.component';

const routes: Routes = [
    { path: 'content', component: ContentComponent },
    { path: 'home', component: HomeComponent },
    { path: 'languages', component: LanguagesComponent },

    { path: '**', component: HomeComponent }
];

export const AppRoutes: any = RouterModule.forRoot(routes, { useHash: true });
