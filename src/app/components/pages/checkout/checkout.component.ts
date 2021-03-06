import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { Cart2Service } from '../../shop/cart.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Order } from '../../shop/order';
import { BillInformation } from '../../shop/billInformation';
import { saveAs } from 'file-saver';
import { ICreateOrderRequest, IPayPalConfig,  } from 'ngx-paypal';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
  public payPalConfig ? : IPayPalConfig;
  showSuccess;



  public shoppingCartItems  : CartItem[] = [];
  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];
  displaySucess: boolean = false;
  amount: number = 0;
  payments: string = "CASH";
  paymentss: string = "PAYPAL";
  //payments: string[] = ['CASH', 'PAYPAL'];
  paymantWay: string[] = ['Post', 'ARAMEX'];
  finalPrice: number;
  orderC: Order = {
    paymentMethode: this.payments,
    shippingAdress: '',
    basket: { id: this.cart2Service.getBasketId() }


  };

  billInfo: BillInformation = {
    firstName: '',
    lastName: '',
    adress: '',
    city: '',
    state: '',
    zip: '',
    phone: ''


  };

  ma: any;
  m: any;
  message: string;
  message2: string;
  finalOrder: any;
  constructor(private cartService: CartService, public productService: ProductService,
    private cart2Service: Cart2Service, private router: Router) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    // this.cartItems.subscribe(products => this.buyProducts = products);
    this.cart2Service.getItemList().subscribe(products => this.buyProducts = products);
    this.message = "Thank you " + this.billInfo.firstName + " your order process successfully completed";
    this.message2 = "you have to download your invoice to get your order";
    this.initConfig();
    console.log('payPalConfig is ' + this.payPalConfig);

  }

  public paymentMethod(payment) {
    let fraisPayement = 0;
    if (payment === "CASH") {
      fraisPayement = 10;
    } else {
      fraisPayement = 5;
    }
    this.finalPrice = this.getTotal() + fraisPayement;
  }

  //  public getTotal(): Observable<number> {
  //   return this.cartService.getTotalAmount();
  //  }

  public getTotal(): number{
  let total =  this.buyProducts.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    return total;
  }

  // public id_generator(): number {
  //   return Math.round(Math.random() * 100000);
  // }

  public calculeTaxe(price): number {
    switch (price) {
      case price < 30:
        return 0;
        break;
      case price >= 30:
        return 7;
        break;
      default:
        return 0;
    }
  }
  public removeBasket(id):void {
    this.cart2Service.deleteBasket(id).subscribe((d) =>{
      console.log("basket deleted");
    }, error => {
      console.log(error);
      
    });

  }

  public addOrderC() {
    const x = {

      paymentMethode: this.orderC.paymentMethode,
      shippingAdress: "First name:  " + this.billInfo.firstName + "\n" + "Last name:  " + this.billInfo.lastName + "\n" + "Adress:  " + this.billInfo.adress + "\n" + "Town/city:  " + this.billInfo.city + "\n" + "State:  " + this.billInfo.state + "\n" + "PostCode/zip:  " + this.billInfo.zip + "\n" + "Phone:  " + this.billInfo.phone,

      basket: { id: this.cart2Service.getBasketId() }
    };



    this.cart2Service.addOrderC(x).subscribe(data => {
      console.log(data);
      const id = data.id;
      this.cart2Service.getInvoice(id).subscribe(data => {
        this.displaySucess = true;
        console.log(data);
        var blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, 'report.pdf');
        console.log("111");
      setTimeout(() => {
        localStorage.clear();
        this.cart2Service.sendMessage("clear");
    
        this.router.navigateByUrl('/home/two');
      }, 4000);
        
      }, error => {
        console.log(error.error.text);
        var blob = new Blob([error.error.text], { type: 'application/pdf' });
        saveAs(blob, 'report.pdf');
        this.displaySucess = true;
     console.log()
          window.open(error.url, "_blank");
        setTimeout(() => {
          localStorage.clear();
          this.router.navigateByUrl('/home/one');
        }, 5000);
        console.log(error);
  
        // implimentation method of facture
      });
    }, error => {
      console.log(error);

      // implimentation method of facture
    })

    //this.cart2Service.getInvoice().subscribe(data => this.finalOrder.id = data);






  }
 
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'DT',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Consomi Tounsi',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('onClick');
      },
    };
  }
  
  }
