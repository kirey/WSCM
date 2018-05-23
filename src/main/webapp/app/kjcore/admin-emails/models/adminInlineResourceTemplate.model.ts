import { AdminEmailTemplate } from '../models';

export class AdminInlineResourceTemplate {
    public id: number;
    public resourceName: string;
    public cdResource: string;
    public description: string;
    public resourceFile: any;
}