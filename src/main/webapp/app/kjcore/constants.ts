export class Constants {
    static TOKEN_STORED_NAME: string = 'X-Auth-Token';
    static TRANSLATION_URL_PREFIX: string = 'rest/translation/fe/';
    static TRANSLATION_URL_PREFIX_NO_AUTH: string = 'rest/translation/fe/noAuth/';
    static APP_CORE_ROUTE_PREFIX: string = 'app/kjcore/';
    static APP_FULL_REF_ROUTE_PREFIX: string = 'app/kjcore/';
    static ROLES = {
        SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
        ADMIN: 'ROLE_ADMIN',
        SUBADMIN: 'ROLE_SUBADMIN',
    }

    static LOGO_URL_PREFIX = 'rest/users/noAuth/logoImage';
    static FILE_URL_PREFIX = 'rest/users/noAuth/file';
    static SERVICE_PROVIDER_IMAGE_URL = 'rest/users/noAuth/defaultLogo';

    static JASPER_DATA_TYPES_PAIRS: Object = {
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
    }

    getROLES() {
        return Constants.ROLES;
    }

    getTOKEN_STORED_NAME(): string {
        return Constants.TOKEN_STORED_NAME;
    }

    getTRANSLATION_URL_PREFIX(): string {
        return Constants.TRANSLATION_URL_PREFIX;
    }

    getTRANSLATION_URL_PREFIX_NO_AUTH(): string {
        return Constants.TRANSLATION_URL_PREFIX_NO_AUTH;
    }

    getAPP_CORE_ROUTE_PREFIX(): string {
        return Constants.APP_CORE_ROUTE_PREFIX;
    }

    getAPP_FULL_REF_ROUTE_PREFIX(): string {
        return Constants.APP_FULL_REF_ROUTE_PREFIX;
    }

    getJASPER_DATA_TYPES_PAIRS(): Object {
        return Constants.JASPER_DATA_TYPES_PAIRS;
    }

    getLOGO_URL_PREFIX(): string {
        return Constants.LOGO_URL_PREFIX;
    }

    getFILE_URL_PREFIX(): string {
        return Constants.FILE_URL_PREFIX;
    }

    getSERVICE_PROVIDER_IMAGE_URL_PREFIX(): string {
        return Constants.SERVICE_PROVIDER_IMAGE_URL;
    }
}