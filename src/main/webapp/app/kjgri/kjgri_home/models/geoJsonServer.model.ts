export interface Properties {
    centerLng: number;
    zoom: number;
    centerLat: number;
}

export interface Crs {
    type: string;
    properties: Properties;
}

export interface Properties2 {
    'stroke-opacity': number;
    'stroke-width': number;
    'fill': string;
    'stroke': string;
    'fill-opacity': number;
    'marker-symbol': string;
    name: string;
    'marker-color': string;
    'marker-size': string;
}

export interface Geometry {
    type: string;
    coordinates: any[];
}

export interface Feature {
    id: number | string;
    type: string;
    properties: Properties2;
    geometry: Geometry;
}

export interface GeoJsonServer {
    type: string;
    crs: Crs;
    features: Feature[];
}