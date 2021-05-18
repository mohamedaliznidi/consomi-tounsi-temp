import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../../shared/services/cart.service';
import { Cart2Service } from '../../shop/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  public cartItems : Observable<CartItem[]> = of([]);
  public shoppingCartItems  : CartItem[] = [];
  subscription: Subscription;

  constructor(private cartService: CartService, private cart2service: Cart2Service) { 
    

    
        
  }

  ngOnInit() {
    // this.cartItems = this.cartService.getItems();
    this.getItemsList();
    // this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
 

// subscribe to home component messages
this.cart2service.getMessage().subscribe(message => {
  if (message) {
    this.shoppingCartItems=[];
    console.log("basket deleted");
  } 
  else {
    console.log("basket deleted**error***");
  }
});

  }


    // Remove cart items
    // public removeItem(item: CartItem) {
    //   this.cartService.removeFromCart(item);
    // }

    public removeItem(id):void {
      this.cart2service.deleteItem(id).subscribe((d) =>{
        console.log("hrlrlo");
      }, error => {
        console.log(error);
        this.getItemsList();
      });
 
    }



   // Increase Product Quantity
   public increment(item: any, quantity: number = 1) {
    this.cartService.updateCartQuantity(item,quantity);
    this.cart2service.updateItem({id: item.id, quantity: item.quantity++}).subscribe(data => data);
  }

  // Decrease Product Quantity
  public decrement(item: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(item,quantity);
    this.cart2service.updateItem({id: item.id, quantity: item.quantity--}).subscribe(data => data);
  }
   // Get Total
   public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  getItemsList(){
    this.cart2service.getItemList().subscribe(data => this.shoppingCartItems = data);
  }
  public getTotal1(): number{
    let total =  this.shoppingCartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
      return total;
    }

}
