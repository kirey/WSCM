import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassLoadingCategoriesService {

  baseUrl = 'rest/classLoading/';

  constructor(private _http: Http) { }

  getCategories() {
    return this._http.get(this.baseUrl + 'categories');
  }
  addCategory(obj) {
    return this._http.post(this.baseUrl + 'categories', obj);
  }
  editCategory(obj){
    return this._http.put(this.baseUrl + 'categories', obj);
  }
  deleteCategory(id){
    console.log("ID je: " + id);
    return this._http.delete(this.baseUrl + 'categories/'+id);
  }

}
