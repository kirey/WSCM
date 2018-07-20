import { ClassLoadingCategoriesComponent } from './class-loading-categories/class-loading-categories.component';
import { ClassLoadingComponent } from './class-loading/class-loading.component';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { LanguagesComponent } from './languages/languages.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { ClientComponent } from './client/client.component';
import { MailRedirectComponent } from './mail-redirect/mail-redirect.component';
import { JobsComponent } from './jobs/jobs.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'content', component: ContentComponent, canActivate: [AuthGuard] },
  { path: 'scheduler', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: 'class-loading', component: ClassLoadingComponent, canActivate: [AuthGuard] },
  { path: 'class-loading-categories', component: ClassLoadingCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'languages', component: LanguagesComponent },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'client-mail', component: MailRedirectComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },

  { path: '**', component: HomeComponent }
];

export const AppRoutes: any = RouterModule.forRoot(routes, { useHash: true });
