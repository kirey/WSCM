import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { LanguagesComponent } from './languages/languages.component';
import { LoginComponent } from './login/login.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ClientComponent } from './client/client.component';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '',redirectTo: '/login',canActivate: [AuthGuard],pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'content', component: ContentComponent, canActivate: [AuthGuard] },
  { path: 'scheduler', component: SchedulerComponent, canActivate: [AuthGuard] },
  { path: 'languages', component: LanguagesComponent },
  { path: 'client', component: ClientComponent ,canActivate: [AuthGuard]},

  { path: '**', component: HomeComponent }
];

export const AppRoutes: any = RouterModule.forRoot(routes, { useHash: true });
