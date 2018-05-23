import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../kjcore/auth.guard';
import { LoginAuthGuard } from './../kjcore/login/login.guard';
import { KJGriHomeAuthGuard } from './kjgri_home/kjgri.home.guard';

import { KJGriConstants } from "./kjgri.constants";

const routes: Routes = [
  {
    path: '',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'landing/kjgri.landing.module#KJGriLandingModule',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'login/login.module#LoginModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'confirm_registration',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'URL_components/confirm_registration/confirmRegistration.module#ConfirmRegistrationModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'activate_user',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'activate_user/activateUser.module#ActivateUserModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'home',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_home/kjgri.home.module#KJGriHomeModule',
    canLoad: [KJGriHomeAuthGuard]
  },
  {
    path: 'reports',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'report_management/reportManagement.module#ReportManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'history',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'history/kjgri.history.module#KJGriHistoryModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'plan_management',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'plan_management/kjgri.plan.module#PlanManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'password_change',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'password_change/passwordChange.module#PasswordChangeModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'admin/report_management',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'report_management/reportManagement.module#ReportManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/create_report',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-create_report/adminCreateReport.module#AdminCreateReportModule',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'admin/control_panel',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'control_panel/control_panel.module#ControlPanelModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/users',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_users/kjgri.adminUsers.module#KJGriAdminUsersModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/roles',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin/roles/adminRoles.module#AdminRolesModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/placeholder_management',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'placeholder_management/kjgri.placeholder.module#PlaceholderManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/style_management',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'style_management/kjgri.style.module#StyleManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/measured_styles',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'measured_styles/kjgri.measured_style.module#MeasuredStyleModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/package_management',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'package_management/kjgri.package.module#PackageManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/error_log',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'error_log/errorLog.module#ErrorLogModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/class_loading',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'class_loading/classLoading.module#ClassLoadingModule',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'admin/translation',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-translation/adminTranslation.module#AdminTranslationModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/routes',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-routes/adminRoutes.module#AdminRoutesModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/action_management',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'action_management/kjgri.action.module#ActionManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/alert_management',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'alert_management/kjgri.alert.module#AlertManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/scheduler_management',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'scheduler_management/schedulerManagement.module#SchedulerManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/jobs',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'jobs_management/jobs.module#JobsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/email_configs',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-emails/email_configs/adminEmailConfigs.module#AdminEmailConfigsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/email_templates',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-emails/email_templates/adminEmailTemplate.module#AdminEmailTemplateModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'registration',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_registration/kjgri.registration.module#RegistrationModule',
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'user_panel',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_user_panel/kjgri.userPanel.module#UserPanelModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/jobs/:name',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'jobs_management/jobHistory.module#JobHistoryModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/generics',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'generics/generics.module#GenericsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/company_management',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_company_management/kjgri.companyManagement.module#KJGriCompanyManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin/company_panel',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'company_panel/companyPanel.module#CompanyPanelModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'monitoringBookedReports',
    loadChildren: KJGriConstants.APP_CORE_ROUTE_PREFIX + 'monitoring_booked_reports/monitoringBookedReports.module#MonitoringBookedReportsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'client_company_management',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'client_company_management/clientCompanyManagement.module#ClientCompanyManagementModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'policy_proposal',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'policy_proposal_search/policyProposal.module#PolicyProposalModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'insurance_companies',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'insurance_companies/insuranceCompanies.module#InsuranceCompaniesModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'client_companies',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'client_companies/clientCompanies.module#ClientCompaniesModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/geolocation_management',
    loadChildren: KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'geolocation_management/geolocationManagement.module#GeolocationManagementModule',
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

export const ROUTING = RouterModule.forRoot(routes);