import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UtilityService } from '../../shared/services/utility.service';
import { RestResponse } from '../../shared/models';

@Injectable()
export class CategoryService {
    baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = 'rest/classLoading/';
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
     * Rest POST call for category adding
     * @author Stefan Svrkota
     */
    addCategoryRest(categoryObject: any): Observable<RestResponse<any>> {
        return this._http.post(this.baseUrl + 'categories', categoryObject)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest PUT call for category editing
     * @author Stefan Svrkota
     */
    editCategoryRest(categoryObject: any): Observable<RestResponse<any>> {
        return this._http.put(this.baseUrl + 'categories?pageId=classLoading', categoryObject)
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }

    /**
     * Rest DELETE call for category delete
     * @author Stefan Svrkota
     */
    deleteCategoryRest(categoryId: number): Observable<RestResponse<any>> {
        return this._http.delete(this.baseUrl + 'categories/' + categoryId + '?pageId=classLoading')
            .map((res: Response) => res.json())
            .catch(UtilityService.handleError);
    }
}