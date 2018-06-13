import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    constructor(private _http: Http) { }

    baseUrl = 'rest/admin/content/';

    // Get array of positions
    getPositions(page: String) {
        return this._http.get(this.baseUrl + page).pipe(map(res => res.json()));
    }

    // Get content of position
    getContent(page: String, position: String, lang: String) {
        return this._http.get(this.baseUrl + page + '/' + position + '/' + lang).pipe(map(res => res));
    }

    // Update position
    updateContent(obj: Object) {
        return this._http.post(this.baseUrl, obj).pipe(map(res => res));
    }
}
