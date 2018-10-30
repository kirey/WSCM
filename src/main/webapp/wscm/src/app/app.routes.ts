// Panel Components
import { ClassLoadingCategoriesComponent } from './admin-panel/class-loading-categories/class-loading-categories.component';
import { ClassLoadingComponent } from './admin-panel/class-loading/class-loading.component';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './admin-panel/content/content.component';
import { HomeComponent } from './admin-panel/home/home.component';
import { LanguagesComponent } from './admin-panel/languages/languages.component';
import { LoginComponent } from './admin-panel/login/login.component';
import { EventsComponent } from './admin-panel/events/events.component';
import { JobsComponent } from './admin-panel/jobs/jobs.component';
import { ReportsComponent } from './admin-panel/reports/reports.component';

// Client components
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { MailRedirectComponent } from './client/mail-redirect/mail-redirect.component';

import { AuthGuard } from './admin-panel/shared/guards/auth.guard';

const routes: Routes = [

  // Main route HOME - CLIENT HOME COMPONENT
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // PANEL ROUTES
  { path: 'panelLogin', component: LoginComponent },
  { path: 'panelHome', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'panelContent', component: ContentComponent, canActivate: [AuthGuard] },
  { path: 'panelEvents', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'panelJobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: 'panelClass-loading', component: ClassLoadingComponent, canActivate: [AuthGuard] },
  { path: 'panelClass-loading-categories', component: ClassLoadingCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'panelLanguages', component: LanguagesComponent },
  { path: 'panelReports', component: ReportsComponent, canActivate: [AuthGuard] },

  // CLIENT ROUTES
  { path: 'home', component: ClientHomeComponent },
  { path: 'client-mail', component: MailRedirectComponent },

  { path: '**', component: ClientHomeComponent }
];

export const AppRoutes: any = RouterModule.forRoot(routes, { useHash: true });
