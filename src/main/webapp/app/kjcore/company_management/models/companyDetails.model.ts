import { Company, CompanyCss } from "../models";

export class CompanyDetails {
    company: Company;
    activeCss?: CompanyCss[];
    previousCss?: CompanyCss[];
    defaultCss?: CompanyCss[];
    newCss?: CompanyCss[];
    setToPreviousCss?: boolean;
    setDefaultCss?: boolean;
    flCustomCss?: boolean;
}