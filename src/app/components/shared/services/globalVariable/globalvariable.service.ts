import { Injectable } from '@angular/core';
import { Basket } from 'src/app/Basket';

@Injectable({
  providedIn: 'root'
})
export class GlobalvariableService {

  constructor() { }
 basket:Basket;

 setbasket(basket)
 {
   this.basket=basket;
 }
 getbasket()
 {
   return this.basket;
 }



}
