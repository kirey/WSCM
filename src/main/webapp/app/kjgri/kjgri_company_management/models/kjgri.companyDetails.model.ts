import { KJGriCompany} from "../models";
import { CompanyCss } from "./../../../kjcore/company_management/models";

export class KJGriCompanyDetails {
    company: KJGriCompany;
    activeCss?: CompanyCss[];
    previousCss?: CompanyCss[];
    defaultCss?: CompanyCss[];
    newCss?: CompanyCss[];
    setToPreviousCss?: boolean;
    setDefaultCss?: boolean;
    flCustomCss?: boolean;
}