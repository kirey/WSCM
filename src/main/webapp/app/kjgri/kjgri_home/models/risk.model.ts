import { RiskSubtype } from "./riskSubtype.model";

export interface Risk {
    id: number;
    name: string;
    code: string;
    dicRiskSubtypeses: RiskSubtype[];
}