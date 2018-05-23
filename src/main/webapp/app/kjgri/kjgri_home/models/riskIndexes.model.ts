import { RiskIndex } from "./riskIndex.model";
import { MeasuredValues } from "./measuredValues.model";

export interface RiskIndexes {
    forecastIndexValueses: RiskIndex[];
    riskIndexValueses: RiskIndex[];
    forecastMeasuredValueses: MeasuredValues;

    longitude: number;
    latitude: number;
    name: string;
    istat: string;
    sub: string;
}