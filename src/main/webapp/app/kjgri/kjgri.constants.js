"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = require("./../kjcore/constants");
var KJGriConstants = (function (_super) {
    __extends(KJGriConstants, _super);
    function KJGriConstants() {
        _super.apply(this, arguments);
    }
    KJGriConstants.prototype.getROLES = function () {
        return KJGriConstants.ROLES;
    };
    KJGriConstants.APP_FULL_REF_ROUTE_PREFIX = 'app/kjgri/';
    KJGriConstants.ROLES = {
        SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
        ADMIN: 'ROLE_ADMIN',
        ADMIN_I: 'ROLE_ADMIN_I',
        ADMIN_A: 'ROLE_ADMIN_A',
        SUBADMIN: 'ROLE_SUBADMIN',
        SUBADMIN_I: 'ROLE_SUBADMIN_I',
        SUBADMIN_A: 'ROLE_SUBADMIN_A',
        PLATINUM_I: 'ROLE_PLATINUM_I',
        PLATINUM_A: 'ROLE_PLATINUM_A',
        GOLD_A: 'ROLE_GOLD_A',
        GOLD_I: 'ROLE_GOLD_I',
        SILVER_A: 'ROLE_SILVER_A',
        SILVER_I: 'ROLE_SILVER_I',
    };
    return KJGriConstants;
}(constants_1.Constants));
exports.KJGriConstants = KJGriConstants;
//# sourceMappingURL=kjgri.constants.js.map