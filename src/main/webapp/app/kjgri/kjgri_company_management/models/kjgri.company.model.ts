import { Company } from "../../../kjcore/company_management/models";

export class KJGriCompany extends Company {
    packageCode: string;
    companyType: string;
    email: string;
    packageExpiryDate: number;
}