import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClassLoadingService {

  constructor(private _http: Http) { }

  baseUrl = 'rest/classLoading/';

  getClasses() {
    return this._http.get(this.baseUrl + 'classes');
  }

  addClass(formData: FormData) {
    return this._http.post(this.baseUrl + 'classes', formData);
  }

  deleteClass(name) {
    return this._http.delete(this.baseUrl + 'classes/?name=' + name);
  }

  editClass(formData: FormData) {
    return this._http.post(this.baseUrl + '/classes/edited',formData);
  }


}
