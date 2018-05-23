"use strict";
var router_1 = require('@angular/router');
var auth_guard_1 = require('./../kjcore/auth.guard');
var login_guard_1 = require('./../kjcore/login/login.guard');
var kjgri_home_guard_1 = require('./kjgri_home/kjgri.home.guard');
var kjgri_constants_1 = require("./kjgri.constants");
var routes = [
    {
        path: '',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'landing/kjgri.landing.module#KJGriLandingModule',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'login/login.module#LoginModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'confirm_registration',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'URL_components/confirm_registration/confirmRegistration.module#ConfirmRegistrationModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'activate_user',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'activate_user/activateUser.module#ActivateUserModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'home',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_home/kjgri.home.module#KJGriHomeModule',
        canLoad: [kjgri_home_guard_1.KJGriHomeAuthGuard]
    },
    {
        path: 'reports',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'report_management/reportManagement.module#ReportManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'history',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'history/kjgri.history.module#KJGriHistoryModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'plan_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'plan_management/kjgri.plan.module#PlanManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'password_change',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'password_change/passwordChange.module#PasswordChangeModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'admin/report_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'report_management/reportManagement.module#ReportManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/create_report',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-create_report/adminCreateReport.module#AdminCreateReportModule',
        canLoad: [auth_guard_1.AuthGuard],
        canActivateChild: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/control_panel',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'control_panel/control_panel.module#ControlPanelModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/users',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_users/kjgri.adminUsers.module#KJGriAdminUsersModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/roles',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin/roles/adminRoles.module#AdminRolesModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/placeholder_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'placeholder_management/kjgri.placeholder.module#PlaceholderManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/style_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'style_management/kjgri.style.module#StyleManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/measured_styles',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'measured_styles/kjgri.measured_style.module#MeasuredStyleModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/package_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'package_management/kjgri.package.module#PackageManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/error_log',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'error_log/errorLog.module#ErrorLogModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/class_loading',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'class_loading/classLoading.module#ClassLoadingModule',
        canLoad: [auth_guard_1.AuthGuard],
        canActivateChild: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/translation',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-translation/adminTranslation.module#AdminTranslationModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/routes',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-routes/adminRoutes.module#AdminRoutesModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/action_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'action_management/kjgri.action.module#ActionManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/alert_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'alert_management/kjgri.alert.module#AlertManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/scheduler_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'scheduler_management/schedulerManagement.module#SchedulerManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/jobs',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'jobs_management/jobs.module#JobsModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/email_configs',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-emails/email_configs/adminEmailConfigs.module#AdminEmailConfigsModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/email_templates',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'admin-emails/email_templates/adminEmailTemplate.module#AdminEmailTemplateModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'registration',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_registration/kjgri.registration.module#RegistrationModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'user_panel',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_user_panel/kjgri.userPanel.module#UserPanelModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/jobs/:name',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'jobs_management/jobHistory.module#JobHistoryModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/generics',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'generics/generics.module#GenericsModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/company_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'kjgri_company_management/kjgri.companyManagement.module#KJGriCompanyManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/company_panel',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'company_panel/companyPanel.module#CompanyPanelModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'monitoringBookedReports',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_CORE_ROUTE_PREFIX + 'monitoring_booked_reports/monitoringBookedReports.module#MonitoringBookedReportsModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'client_company_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'client_company_management/clientCompanyManagement.module#ClientCompanyManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'policy_proposal',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'policy_proposal_search/policyProposal.module#PolicyProposalModule',
        canLoad: [auth_guard_1.AuthGuard],
    },
    {
        path: 'insurance_companies',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'insurance_companies/insuranceCompanies.module#InsuranceCompaniesModule',
        canLoad: [auth_guard_1.AuthGuard],
    },
    {
        path: 'client_companies',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'client_companies/clientCompanies.module#ClientCompaniesModule',
        canLoad: [auth_guard_1.AuthGuard],
    },
    {
        path: 'admin/geolocation_management',
        loadChildren: kjgri_constants_1.KJGriConstants.APP_FULL_REF_ROUTE_PREFIX + 'geolocation_management/geolocationManagement.module#GeolocationManagementModule',
        canLoad: [auth_guard_1.AuthGuard],
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
exports.ROUTING = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map