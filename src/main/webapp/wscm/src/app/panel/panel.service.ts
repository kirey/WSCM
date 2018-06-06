import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PanelService {

    constructor(private _http: Http) { }

    baseUrl = "rest/content/";

    getContent(type: String, page: String, position: String, lang: String) {
        return this._http.get(this.baseUrl + type + '/' + page + '/' + position + '/' + lang).pipe(map(res => res));
    }
}
