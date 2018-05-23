import { GeolocationPoint } from "./geolocationPoint.model";

export interface Geolocation {
    id?: number,
    name: string;
    longitude: number;
    latitude: number;
    istat: string;
    sub: string;

    geolocationPointses?: GeolocationPoint[];
}


