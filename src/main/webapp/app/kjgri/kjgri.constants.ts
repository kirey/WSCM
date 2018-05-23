import { Constants } from "./../kjcore/constants";

export class KJGriConstants extends Constants {
    static APP_FULL_REF_ROUTE_PREFIX: string = 'app/kjgri/';

    static ROLES = {
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
    }

    getROLES() {
        return KJGriConstants.ROLES;
    }
}