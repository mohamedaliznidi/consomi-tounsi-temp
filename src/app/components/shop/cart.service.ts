import random from '@angular-devkit/schematics/src/rules/random';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class Cart2Service {

  constructor(private http: HttpClient) { }

generateId(){
  return Math.round(Math.random()*10000);
}

  getProductList() {
    return this.http.get<any>('http://localhost:8081/api/listproducts');
  }


  getItemList() {
    return this.http.get<any>('http://localhost:8081/api/clients/listitems');
  }


  addProduct(product) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post("xxxxxxxxxxxxxxxxxxxxxxxxxxx",
      JSON.stringify(product),
      { headers: reqHeader });
  }

  updateProduct(id, product) {

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put("xxxx" + id,
      JSON.stringify(product),
      { headers: reqHeader });
  }

  deleteProduct(id) {
    return this.http.delete("xxxx/" + id);
  }
  // addOrderC(orderC) { 



  //     return this.http.post("localhost:8081/api/clients/addOrderC",orderC,{responseType:'text' as 'json'});
  // }
  //   var reqHeader= new  HttpHeaders({ 'Content-Type': 'application/json'});
  //    return  this.http.post("",
  //    JSON.stringify(orderC),
  //    {headers: reqHeader});
  // }
  addOrderC(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/clients/addOrderC', data);
  }

  // addFirstItem(data: any) { 
  //     return  this.http.post('http://localhost:8081/api/clients/additem',data);
  // }
  addItem(data: Item) {
    data.id = this.generateId();
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:8081/api/clients/additem',
      JSON.stringify(data),
      { headers: reqHeader });

  }
  public getBasketId() {
    return parseInt(localStorage.getItem("basketID"));
  }
  getInvoice(id): any{
    return this.http.get<any>('http://localhost:8081/api/clients/pdfreport/'+id);
  }

  // makePayment(sum) {
  //   return this.http.post('http://localhost:8081/paypal/make/payment?sum='+sum, {})
  //     .map((response: Response) => response.json());
  // }
  // completePayment(paymentId, payerId) {
  //   return this.http.post('http://localhost:8081/paypal/complete/payment?paymentId=' + paymentId + '&payerId=' + payerId , {})
  //     .map((response: Response) => response.json());
  // }
  public deleteItem(id){
    return this.http.delete('http://localhost:8081/api/clients/deleteitem/'+id);
  }

  public getOneItem(id){
    return this.http.delete('http://localhost:8081/api/clients/getitem/'+id);
  }

  makePayment(sum) {
    return this.http.post('http://localhost:8081/paypal/make/payment?sum='+sum, {});
  }
  updateItem(data: any) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put('http://localhost:8081/api/clients/updateitem',
      JSON.stringify(data),
      { headers: reqHeader });

  }
  public deleteBasket(id){
    return this.http.delete('http://localhost:8081/api/clients/deletebasket/'+id);
  }
  
}
