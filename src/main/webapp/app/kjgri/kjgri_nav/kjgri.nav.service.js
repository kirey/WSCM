"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
/**
 * Service for navigation menu
 * @author Mario Petrovic
 */
var KJGriNavService = (function () {
    function KJGriNavService() {
        this.menuData = [
            {
                title: 'fe.navigation.home',
                route: 'home'
            },
            {
                title: 'fe.navigation.reports',
                route: 'reports',
                dropdown: [
                    {
                        title: 'fe.navigation.monitoringBookedReports',
                        route: 'monitoringBookedReports'
                    },
                    {
                        title: 'fe.navigation.reports',
                        route: 'reports',
                    }
                ]
            },
            {
                title: 'fe.navigation.planManagement',
                route: 'plan_management'
            },
            {
                title: 'fe.navigation.history',
                route: 'history'
            },
            {
                title: 'fe.navigation.insuranceCompanies',
                route: 'insurance_companies',
            },
            {
                title: 'fe.navigation.clientCompanies',
                route: 'client_companies',
            },
            {
                title: 'fe.navigation.adminPanel',
                route: 'AdminPanel',
                dropdown: [
                    {
                        title: 'fe.navigation.errorLog',
                        route: 'admin/error_log'
                    },
                    {
                        title: 'fe.navigation.controlPanel',
                        route: 'admin/control_panel'
                    },
                    {
                        title: 'fe.navigation.report',
                        route: 'admin/create_report',
                        isOpen: false,
                        submenu: [
                            {
                                title: 'fe.navigation.report.create',
                                route: 'admin/create_report'
                            },
                            {
                                title: 'fe.navigation.report.management',
                                route: 'admin/report_management'
                            },
                        ]
                    },
                    {
                        title: 'fe.navigation.classLoading',
                        route: 'admin/class_loading',
                        isOpen: false,
                        submenu: [
                            {
                                title: 'fe.navigation.classLoading.management',
                                route: 'admin/class_loading'
                            },
                            {
                                title: 'fe.navigation.classLoading.categories',
                                route: 'admin/class_loading/categories'
                            }
                        ]
                    },
                    {
                        title: 'fe.navigation.translation',
                        route: 'admin/translation'
                    },
                    {
                        title: 'fe.navigation.routes',
                        route: 'admin/routes'
                    },
                    {
                        title: 'fe.navigation.actionManagement',
                        route: 'admin/action_management'
                    },
                    {
                        title: 'fe.navigation.alertManagement',
                        route: 'admin/alert_management'
                    },
                    {
                        title: 'fe.navigation.placeholderManagement',
                        route: 'admin/placeholder_management'
                    },
                    {
                        title: 'fe.navigation.packageManagement',
                        route: 'admin/package_management'
                    },
                    {
                        title: 'fe.navigation.styleManagement',
                        route: 'admin/style_management'
                    },
                    {
                        title: 'fe.navigation.measuredStyle',
                        route: 'admin/measured_styles'
                    },
                    {
                        title: 'fe.navigation.geolocationManagement',
                        route: 'admin/geolocation_management'
                    },
                    {
                        title: 'fe.navigation.user',
                        route: 'admin/users',
                        isOpen: false,
                        submenu: [
                            {
                                title: 'fe.navigation.user.management',
                                route: 'admin/users',
                            },
                            {
                                title: 'fe.navigation.user.roles',
                                route: 'admin/roles'
                            }
                        ]
                    },
                    {
                        title: 'fe.navigation.emailing',
                        route: 'admin/email_configs',
                        isOpen: false,
                        submenu: [
                            {
                                title: 'fe.navigation.emailConfigs',
                                route: 'admin/email_configs'
                            },
                            {
                                title: 'fe.navigation.emailTemplates',
                                route: 'admin/email_templates'
                            }
                        ]
                    },
                    {
                        title: 'fe.navigation.generics',
                        route: 'admin/generics'
                    },
                    {
                        title: 'fe.navigation.batchManagement',
                        route: 'admin/scheduler_management',
                        isOpen: false,
                        submenu: [
                            {
                                title: 'fe.navigation.schedulerManagement',
                                route: 'admin/scheduler_management'
                            },
                            {
                                title: 'fe.navigation.jobs',
                                route: 'admin/jobs'
                            }
                        ]
                    },
                    {
                        title: 'fe.navigation.companiesManagement',
                        route: 'admin/company_management',
                    },
                ]
            }
        ];
    }
    KJGriNavService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], KJGriNavService);
    return KJGriNavService;
}());
exports.KJGriNavService = KJGriNavService;
//# sourceMappingURL=kjgri.nav.service.js.map