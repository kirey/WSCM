import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    constructor(private _http: HttpClient) { }

    baseUrl = 'rest/admin/content';

    // Get array of positions
    getPositions(page: String) {
        return this._http.get(this.baseUrl + '/' + page).pipe(map(res => res));
    }

    // Get content of position
    getContent(page: String, position: String, lang: String) {
        return this._http.get(this.baseUrl + '/' + page + '/' + position + '/' + lang).pipe(map(res => res));
    }

    // Get Categories
    getCategories() {
        return this._http.get(this.baseUrl + '/' + 'categories').pipe(map(res => res));
    }

    // Update position
    updateContent(obj: Object) {
        // let params = new HttpParams()
        //     .set('categoryId', category)
        //     .set('weight', weight);

        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };



        return this._http.post(this.baseUrl + '/edit', obj, options).pipe(map(res => res));
    }
}
