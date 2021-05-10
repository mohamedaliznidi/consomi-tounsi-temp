import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id :number;
  healthyscore : number;
  ecoscore : number;
  nutriscore : string;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
 @Input() product: Product;

  constructor(private cartService: CartService, public productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router,config: NgbRatingConfig ) {     config.max = 5;
    config.readonly = true;}

  ngOnInit() {
    this.id=this.product.id;
   this.gethealthyscore(this.id);
    this.getecoscore(this.id);
  

  }

     // Add to cart
     public addToCart(product: Product,  quantity: number = 1) {
      this.cartService.addToCart(product,quantity);
      console.log(product, quantity);
    }

    // Add to wishlist
    public addToWishlist(product: Product) {
      this.wishlistService.addToWishlist(product);
   }

    // Add to compare
   /* public addToCompare(product: Product) {
      this.productsService.addToCompare(product);
   }*/


  public openProductDialog(product){
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }


  //Healthy score
  gethealthyscore(id){
    this.productsService.getNutriScore(id).subscribe(
  
      (response: number)=> {
        this.healthyscore=response;
        if (this.product.categoryname == "boissons"){
          if (this.healthyscore <=1){this.nutriscore="B";}
          else  if (this.healthyscore <= 5){this.nutriscore="C";}
          else if (this.healthyscore <= 9){this.nutriscore="D";}
          else {this.nutriscore="E";}
      }
      else if (this.product.categoryname == "eau"){
          this.nutriscore = "A";
      }
      else { 
          if (this.healthyscore <= -1){this.nutriscore="A";}
          else if (this.healthyscore <= 2){this.nutriscore="B";}
          else if (this.healthyscore <= 10){this.nutriscore="C";}
          else if (this.healthyscore <= 18){this.nutriscore="D";}
          else {this.nutriscore="E";}
      }    
     

      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }

//Eco score

getecoscore(id){
  this.productsService.getEcoScore(id).subscribe(

    (response: number)=> {
      this.ecoscore=response;
   

    },
    (error: HttpErrorResponse)=> {
      alert(error.message);
    }
  );
}




}
