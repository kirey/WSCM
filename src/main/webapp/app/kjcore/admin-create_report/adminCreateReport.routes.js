"use strict";
var router_1 = require('@angular/router');
var adminCreateReport_cmp_1 = require('../admin-create_report/adminCreateReport.cmp');
exports.ROUTING = router_1.RouterModule.forChild([
    {
        path: '',
        component: adminCreateReport_cmp_1.AdminCreateReportCmp
    },
    {
        path: ':id',
        component: adminCreateReport_cmp_1.AdminCreateReportCmp
    }
]);
//# sourceMappingURL=adminCreateReport.routes.js.map