"use strict";
var Constants = (function () {
    function Constants() {
    }
    Constants.prototype.getROLES = function () {
        return Constants.ROLES;
    };
    Constants.prototype.getTOKEN_STORED_NAME = function () {
        return Constants.TOKEN_STORED_NAME;
    };
    Constants.prototype.getTRANSLATION_URL_PREFIX = function () {
        return Constants.TRANSLATION_URL_PREFIX;
    };
    Constants.prototype.getTRANSLATION_URL_PREFIX_NO_AUTH = function () {
        return Constants.TRANSLATION_URL_PREFIX_NO_AUTH;
    };
    Constants.prototype.getAPP_CORE_ROUTE_PREFIX = function () {
        return Constants.APP_CORE_ROUTE_PREFIX;
    };
    Constants.prototype.getAPP_FULL_REF_ROUTE_PREFIX = function () {
        return Constants.APP_FULL_REF_ROUTE_PREFIX;
    };
    Constants.prototype.getJASPER_DATA_TYPES_PAIRS = function () {
        return Constants.JASPER_DATA_TYPES_PAIRS;
    };
    Constants.prototype.getLOGO_URL_PREFIX = function () {
        return Constants.LOGO_URL_PREFIX;
    };
    Constants.prototype.getFILE_URL_PREFIX = function () {
        return Constants.FILE_URL_PREFIX;
    };
    Constants.prototype.getSERVICE_PROVIDER_IMAGE_URL_PREFIX = function () {
        return Constants.SERVICE_PROVIDER_IMAGE_URL;
    };
    Constants.TOKEN_STORED_NAME = 'X-Auth-Token';
    Constants.TRANSLATION_URL_PREFIX = 'rest/translation/fe/';
    Constants.TRANSLATION_URL_PREFIX_NO_AUTH = 'rest/translation/fe/noAuth/';
    Constants.APP_CORE_ROUTE_PREFIX = 'app/kjcore/';
    Constants.APP_FULL_REF_ROUTE_PREFIX = 'app/kjcore/';
    Constants.ROLES = {
        SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
        ADMIN: 'ROLE_ADMIN',
        SUBADMIN: 'ROLE_SUBADMIN',
    };
    Constants.LOGO_URL_PREFIX = 'rest/users/noAuth/logoImage';
    Constants.FILE_URL_PREFIX = 'rest/users/noAuth/file';
    Constants.SERVICE_PROVIDER_IMAGE_URL = 'rest/users/noAuth/defaultLogo';
    Constants.JASPER_DATA_TYPES_PAIRS = {
        Integer: 'Integer',
        BigDecimal: 'Integer',
        Long: 'Integer',
        Short: 'Integer',
        String: 'String',
        Double: 'Decimal',
        Float: 'Decimal',
        Date: 'Date',
        Timestamp: 'Timestamp',
        HashMap: 'HashMap',
        JasperReport: 'JasperReport'
    };
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=constants.js.map