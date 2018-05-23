import { Injectable } from '@angular/core';

import { MenuItem } from './models';

/**
 * Service for navigation menu
 * @author Mario Petrovic
 */
@Injectable()
export class NavService {
    menuData: MenuItem[];

    constructor() {
        this.menuData = [
            {
                title: 'fe.navigation.home',
                route: 'home',
                allowAll: true
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
                title: 'fe.navigation.adminPanel',
                route: 'AdminPanel',
                dropdown: [
                    {
                        title: 'fe.navigation.errorLog',
                        route: 'admin/error_log'
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
                    {
                        title: 'fe.navigation.companyPanel',
                        route: 'admin/company_panel',
                    }
                ]
            }
        ]
    }

}