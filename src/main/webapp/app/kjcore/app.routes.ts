import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginAuthGuard } from './login/login.guard';
import { HomeAuthGuard } from './home/home.guard';



import { Constants } from "./constants";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'login/login.module#LoginModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'confirm_registration',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'URL_components/confirm_registration/confirmRegistration.module#ConfirmRegistrationModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'home',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'home/home.module#HomeModule',
    canLoad: [HomeAuthGuard]
  },
  {
    path: 'reports',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'report_management/reportManagement.module#ReportManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'password_change',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'password_change/passwordChange.module#PasswordChangeModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'admin/report_management',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'report_management/reportManagement.module#ReportManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/create_report',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'admin-create_report/adminCreateReport.module#AdminCreateReportModule',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'admin/users',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'admin/users/adminUsers.module#AdminUsersModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/roles',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'admin/roles/adminRoles.module#AdminRolesModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/error_log',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'error_log/errorLog.module#ErrorLogModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/class_loading',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'class_loading/classLoading.module#ClassLoadingModule',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'admin/translation',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'admin-translation/adminTranslation.module#AdminTranslationModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/routes',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'admin-routes/adminRoutes.module#AdminRoutesModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/scheduler_management',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'scheduler_management/schedulerManagement.module#SchedulerManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/jobs',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'jobs_management/jobs.module#JobsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/email_configs',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'admin-emails/email_configs/adminEmailConfigs.module#AdminEmailConfigsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/email_templates',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'admin-emails/email_templates/adminEmailTemplate.module#AdminEmailTemplateModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'registration',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'registration/registration.module#RegistrationModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'user_panel',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'user_panel/userPanel.module#UserPanelModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/jobs/:name',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'jobs_management/jobHistory.module#JobHistoryModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'registration',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'registration/registration.module#RegistrationModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path:'admin/generics',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'generics/generics.module#GenericsModule',
    canLoad: [AuthGuard]
  },
   {
    path:'admin/company_management',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'company_management/companyManagement.module#CompanyManagementModule',
    canLoad: [AuthGuard]
  },
   {
    path:'admin/company_panel',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'company_panel/companyPanel.module#CompanyPanelModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'monitoringBookedReports',
    loadChildren: Constants.APP_CORE_ROUTE_PREFIX + 'monitoring_booked_reports/monitoringBookedReports.module#MonitoringBookedReportsModule',
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

export const ROUTING = RouterModule.forRoot(routes);