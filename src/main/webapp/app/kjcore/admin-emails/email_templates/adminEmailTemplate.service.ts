import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../../shared/services/utility.service';

import { AdminEmailTemplate, AdminInlineResourceTemplate } from '../models';

import { RestResponse } from "./../../shared/models";

@Injectable()
export class AdminEmailTemplateService {
    baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/adminEmails/';
    }

    /*  -------- Email Template REST Cals --------**/

    /**
     * Rest GET call to retrieve all email templates
     * @author Ciprian Dorofte
     */
    getAllEmailsTemplatesRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'getAllEmailsTemplates')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest DELETE call to delete an email template
     * @author Ciprian Dorofte
     */
    deleteEmailTemplateRest(emailTemplateId: number): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + 'deleteEmailTemplate/' + emailTemplateId)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest POST call to save an email template
     * @author Ciprian Dorofte
     */
    saveEmailTemplateRest(pageId: string, emailTemplateData: FormData): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + 'saveEmailTemplate?pageId=' + pageId, emailTemplateData)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest POST call to update an email template
     * @author Ciprian Dorofte
     */
    updateEmailTemplateRest(pageId: string, emailTemplateData: FormData): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + 'updateEmailTemplate?pageId=' + pageId, emailTemplateData)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}