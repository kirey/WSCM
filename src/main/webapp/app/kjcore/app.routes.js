"use strict";
var router_1 = require('@angular/router');
var auth_guard_1 = require('./auth.guard');
var login_guard_1 = require('./login/login.guard');
var home_guard_1 = require('./home/home.guard');
var constants_1 = require("./constants");
var routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'login/login.module#LoginModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'confirm_registration',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'URL_components/confirm_registration/confirmRegistration.module#ConfirmRegistrationModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'home',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'home/home.module#HomeModule',
        canLoad: [home_guard_1.HomeAuthGuard]
    },
    {
        path: 'reports',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'report_management/reportManagement.module#ReportManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'password_change',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'password_change/passwordChange.module#PasswordChangeModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'admin/report_management',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'report_management/reportManagement.module#ReportManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/create_report',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'admin-create_report/adminCreateReport.module#AdminCreateReportModule',
        canLoad: [auth_guard_1.AuthGuard],
        canActivateChild: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/users',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'admin/users/adminUsers.module#AdminUsersModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/roles',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'admin/roles/adminRoles.module#AdminRolesModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/error_log',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'error_log/errorLog.module#ErrorLogModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/class_loading',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'class_loading/classLoading.module#ClassLoadingModule',
        canLoad: [auth_guard_1.AuthGuard],
        canActivateChild: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/translation',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'admin-translation/adminTranslation.module#AdminTranslationModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/routes',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'admin-routes/adminRoutes.module#AdminRoutesModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/scheduler_management',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'scheduler_management/schedulerManagement.module#SchedulerManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/jobs',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'jobs_management/jobs.module#JobsModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/email_configs',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'admin-emails/email_configs/adminEmailConfigs.module#AdminEmailConfigsModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/email_templates',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'admin-emails/email_templates/adminEmailTemplate.module#AdminEmailTemplateModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'registration',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'registration/registration.module#RegistrationModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'user_panel',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'user_panel/userPanel.module#UserPanelModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/jobs/:name',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'jobs_management/jobHistory.module#JobHistoryModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'registration',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'registration/registration.module#RegistrationModule',
        canActivate: [login_guard_1.LoginAuthGuard]
    },
    {
        path: 'admin/generics',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'generics/generics.module#GenericsModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/company_management',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'company_management/companyManagement.module#CompanyManagementModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'admin/company_panel',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'company_panel/companyPanel.module#CompanyPanelModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'monitoringBookedReports',
        loadChildren: constants_1.Constants.APP_CORE_ROUTE_PREFIX + 'monitoring_booked_reports/monitoringBookedReports.module#MonitoringBookedReportsModule',
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
exports.ROUTING = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map