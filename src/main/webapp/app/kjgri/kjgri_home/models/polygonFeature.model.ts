export interface PolygonFeature {
    geometry: { type: string, coordinates: [[[number, number]]] };
    properties: {
        COD_CM: number;
        COD_PRO: number;
        COD_REG: number;
        COMUNE: string;
        FLAG_CM: number;
        NOME_TED: any;
        PRO_COM: number;
        SHAPE_Area: number;
        SHAPE_Leng: number;
        fill: string;
        istat: string;
        stroke: string;
        'stroke-width': number;
        sub: string;
    }
    type: 'Feature';
}