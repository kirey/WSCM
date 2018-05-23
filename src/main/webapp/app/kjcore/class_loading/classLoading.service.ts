import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../shared/services/utility.service';
import { RestResponse } from '../shared/models';

@Injectable()
export class ClassLoadingService {
    baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/classLoading/';
    }

    /**
     * Rest POST call for class upload
     * @author Kirey
     */
    uploadRest(formData: FormData): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + 'classes?pageId=classLoading', formData)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for getting all classes
     * @author Kirey
     */
    getAllClassesRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'classes?pageId=classLoading')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for getting all categories
     * @author Stefan Svrkota
     */
    getAllCategoriesRest(): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'categories?pageId=classLoading')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest DELETE call for class delete
     * @author Kirey
     */
    deleteClassRest(className: string): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + 'classes?pageId=classLoading&name=' + className)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for class edit
     * @author Kirey
     */
    getEditClassRest(className: string): Observable<RestResponse<any>> {
        return this._http.get(this.baseUrl + 'classes/info?pageId=classLoading&name=' + className)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest POST call for class edit
     * @author Kirey
     */
    postEditClassRest(formData: FormData): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + 'classes/edited?pageId=classLoading', formData)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for class status change
     * @author Kirey
     */
    changeStatusRest(checked: boolean, classId: number): Observable<RestResponse<any>> {
        let temp: number;
        if (checked == true)
            temp = 1;
        else
            temp = 0;
        return this._http.post(this.baseUrl + 'classes/checkmarks/' + classId + '?pageId=classLoading&checked=' + temp, "")
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest GET call for status change of all c;asses
     * @author Kirey
     */
    changeAllStatusesRest(checked: boolean): Observable<RestResponse<any>> {
        let temp: number;
        if (checked == true)
            temp = 1;
        else
            temp = 0;
        return this._http.post(this.baseUrl + 'classes/checkmarks?pageId=classLoading&checked=' + temp, "")
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * JVM
     * @author Kirey
     */
    enabledClassesInMemoryRest(): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + 'classes/load', "")
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}