import { RiskSubtype } from "./riskSubtype.model";

export interface RiskIndex {
    indexValue: string;
    measurementDate: number;
    numericValue: number;
    value: string;
    
    dicRiskSubtypes: {name: string, code: string};
}