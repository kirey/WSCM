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
    options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

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
        return this._http.post(this.baseUrl + '/edit', obj, this.options).pipe(map(res => res));
    }

    // Delete Position
    deletePosition(id) {
        return this._http.delete(this.baseUrl + '/' + id, this.options);
    }
}
