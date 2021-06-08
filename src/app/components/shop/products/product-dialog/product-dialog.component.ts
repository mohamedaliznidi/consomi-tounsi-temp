import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.sass']
})
export class ProductDialogComponent implements OnInit {
  id :number;
  healthyscore : number;
  ecoscore : number;
  nutriscore : string;
  public products           :   Product[] = [];
  public counter            :   number = 1;
  public variantImage       :   any = '';
  public selectedColor      :   any = '';
  public selectedSize       :   any = '';

  constructor(private router: Router, public productsService: ProductService, private cartService: CartService, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(product => this.products = product);
    this.id=this.product.id;
   this.gethealthyscore(this.id);
    this.getecoscore(this.id);
  
  }


  public addToCart(product: Product, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }

  public close(): void {
    this.dialogRef.close();
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if(this.counter >1){
       this.counter -= 1;
    }
  }

     // Add to cart
     public buyNow() {
      this.router.navigate(['/home/product', this.product.id]);
      this.close();
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
