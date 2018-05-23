import { AdminInlineResourceTemplate } from '../models';

export class AdminEmailTemplate {
    public id: number;
    public name: string;
    public template: any;
    public emailSubject: string;
    public description: string;
    public adminInlineResTemp: any[];
    public messageFrom: string;
    public utInsert: number;
    public tsInsert: Date;
    public utUpdate: number;
    public tsUpdate: Date;
    public kjcInlineResourceTemplateses: AdminInlineResourceTemplate[];
}