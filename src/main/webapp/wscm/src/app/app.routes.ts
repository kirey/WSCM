import { ClassLoadingCategoriesComponent } from './admin-panel/class-loading-categories/class-loading-categories.component';
import { ClassLoadingComponent } from './admin-panel/class-loading/class-loading.component';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './admin-panel/content/content.component';
import { HomeComponent } from './admin-panel/home/home.component';
import { LanguagesComponent } from './admin-panel/languages/languages.component';
import { LoginComponent } from './admin-panel/login/login.component';
import { EventsComponent } from './admin-panel/events/events.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { MailRedirectComponent } from './client/mail-redirect/mail-redirect.component';
import { JobsComponent } from './admin-panel/jobs/jobs.component';

import { AuthGuard } from './admin-panel/shared/guards/auth.guard';
import { ReportsComponent } from './admin-panel/reports/reports.component';

const routes: Routes = [

  // Main route HOME - CLIENT HOME COMPONENT
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // PANEL ROUTES
  { path: 'panelLogin', component: LoginComponent },
  { path: 'panel-home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'panel-content', component: ContentComponent, canActivate: [AuthGuard] },
  { path: 'panel-events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'panel-jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: 'panel-class-loading', component: ClassLoadingComponent, canActivate: [AuthGuard] },
  { path: 'panel-class-loading-categories', component: ClassLoadingCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'panel-languages', component: LanguagesComponent },
  { path: 'panel-reports', component: ReportsComponent, canActivate: [AuthGuard] },

  // CLIENT ROUTES
  { path: 'home', component: ClientHomeComponent },
  { path: 'client-mail', component: MailRedirectComponent },

  { path: '**', component: ClientHomeComponent }
];

export const AppRoutes: any = RouterModule.forRoot(routes, { useHash: true });
