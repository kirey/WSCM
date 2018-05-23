import { UserRoute } from './userRoute.model';

export class UserInfo {
    companies: any;
    companyCssPrefix: string;
    cssStyles: string[];
    defaultLanguage: string;
    roles: string[];
    userRoutes?: UserRoute[];
    username: string;
    email: string;
    languages: any[];
    accountExpiryDate: number;
    companyId: number;
    accountType: string;
}