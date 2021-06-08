import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable}  from 'rxjs';
import { environment } from 'src/environments/environment';
import { comments } from './product-details.component';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http : HttpClient) {}
   
   private apiserverUrl=environment.apiBaseUrl;

    public getcomments():Observable<comments[]>{

        return this.http.get<comments[]>(`${this.apiserverUrl}/commentproduct/comments`)

    }

    getPComments(id: number): Observable<comments[]> {
      return this.http.get<comments[]>(`${this.apiserverUrl}/commentproduct/findproductcomments/`+id)
    }
    addComment(productid,clientid,data){

      const addendpoint =`${this.apiserverUrl}/commentproduct/addcomment/`+clientid +`/`+productid;
      return this.http.post(addendpoint,data)
    }
  
}
