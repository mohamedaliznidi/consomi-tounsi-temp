import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productcategory } from './brands.component';
import { environment } from 'src/environments/environment';
import {Observable}  from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http : HttpClient) { }
 private apiserverUrl=environment.apiBaseUrl;

 public getProductcategories():Observable<Productcategory[]>{

  return this.http.get<Productcategory[]>(`${this.apiserverUrl}/productcategory/productcategories`)

}

}
