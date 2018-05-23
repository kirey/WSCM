import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../shared/services/utility.service';

import { RestResponse } from '../shared/models';

@Injectable()
export class GenericsService {
    _baseUrl: string;
    constructor(private _http: Http) {
        this._baseUrl = "rest/generics";
    };
    /**
     * retrieve all generics from database
     * @author Roxana
     */
    getGenericsRest(): Observable<RestResponse<any>> {
        return this._http.get(this._baseUrl)
            .map((resp: Response) => resp = resp.json())
            .catch(UtilityService.handleError);
    }

    /**
     * delete generics with selected category
     * @author Roxana
     */
    deleteCategoryRest(category: string): Observable<RestResponse<any>> {
        return this._http.delete(this._baseUrl + "/deleteCategory/" + category).map((resp: Response) => resp = resp.json());
    }

    /**
     * delete generics with selected category and subcategory
     * @author Roxana
     */
    deleteSubcategoryRest(category: string, subcategory: string): Observable<RestResponse<any>> {
        return this._http.delete(this._baseUrl + "/deleteSubcategory/" + category + "/" + subcategory)
            .map((resp: Response) => resp = resp.json())
            .catch(UtilityService.handleError);
    }

    /**
     * delete generics by key
     * @author Roxana
     */
    deleteGenericRest(key: string): Observable<RestResponse<any>> {
        return this._http.delete(this._baseUrl + "/" + key)
            .map((resp: Response) => resp = resp.json())
            .catch(UtilityService.handleError);
    }

    /**
     * update generic
     * @author Roxana
     */
    saveGenericRest(generic: any, pageId: string): Observable<RestResponse<any>> {
        return this._http.post(this._baseUrl + "?pageId=" + pageId, generic)
            .map((resp: Response) => resp = resp.json())
            .catch(UtilityService.handleError);
    }

    /**
     * update generic
     * @author Roxana
     */
    updateGenericRest(generic: any, oldKey: string, pageId: String): Observable<RestResponse<any>> {
        return this._http.put(this._baseUrl + "?oldKey=" + oldKey + "&pageId=" + pageId, generic)
            .map((resp: Response) => resp = resp.json())
            .catch(UtilityService.handleError);
    }

    /**
     * filter generics displayed on page by category and subcategory
     * @author Roxana
     */
    getFilteredResultsRest(category: string, subcategory: string): Observable<RestResponse<any>> {
        return this._http.get(this._baseUrl + "/filterResult/" + category + "/" + subcategory)
            .map((resp: Response) => resp = resp.json())
            .catch(UtilityService.handleError);
    }

    /**
     * update the key of all generics in the selected category
     * send oldCategory to know which generics must be updated
     * @author Roxana
     */
    updateCategoryRest(oldCategory: string, newCategory: string): Observable<RestResponse<any>> {
        let options = {
            "oldCategory": oldCategory,
            "newCategory": newCategory
        }
        return this._http.put(this._baseUrl + "/updateCategory", options)
            .map((resp: Response) => resp = resp.json())
            .catch(UtilityService.handleError);
    }

    /**
     * update the key of all generics in the selected category and subcategory
     * send oldSubcategory to know which generics must be updated
     * @author Roxana
     */
    updateSubcategoryRest(category: string, oldSubcategory: string, newSubcategory: string): Observable<RestResponse<any>> {
        let options = {
            "category": category,
            "oldSubcategory": oldSubcategory,
            "newSubcategory": newSubcategory
        }
        return this._http.put(this._baseUrl + "/updateSubcategory", options)
            .map((resp: Response) => resp = resp.json())
            .catch(UtilityService.handleError);
    }

}