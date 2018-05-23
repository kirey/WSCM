"use strict";
var router_1 = require('@angular/router');
var kjgri_history_cmp_1 = require('./kjgri.history.cmp');
exports.ROUTING = router_1.RouterModule.forChild([
    {
        path: '',
        component: kjgri_history_cmp_1.KJGriHistoryCmp
    },
    {
        path: ':locationId',
        component: kjgri_history_cmp_1.KJGriHistoryCmp
    },
    {
        path: ':locationId/:companyId',
        component: kjgri_history_cmp_1.KJGriHistoryCmp
    }
]);
//# sourceMappingURL=kjgri.history.routes.js.map