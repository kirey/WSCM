"use strict";
var router_1 = require('@angular/router');
var classLoading_cmp_1 = require('./classLoading.cmp');
var categories_cmp_1 = require('./categories/categories.cmp');
var routes = [
    {
        path: '',
        component: classLoading_cmp_1.ClassLoadingCmp,
    },
    {
        path: 'categories',
        component: categories_cmp_1.CategoriesCmp
    }
];
exports.ROUTING = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=classLoading.routes.js.map