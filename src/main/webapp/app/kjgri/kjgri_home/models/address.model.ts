export interface Address {
    address: {city: string, county: string, state: string, postcode: string, country: string};
    city: string;
    country: string;
    country_code: string;
    county: string;
    postcode: string;
    state: string;
    boundingbox: [number, number, number, number];
    class: string;
    display_name: string;
    geojson: {type: string, coordinates: any[]};
    icon: string;
    importance: number;
    lat: number;
    licence: string;
    lon: number;
    osm_id: number;
    osm_type: string;
    place_id: number;
    type: string;
}