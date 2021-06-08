import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Cart2Service } from '../../cart.service';
import { Item } from '../../item';
import { GlobalvariableService } from 'src/app/components/shared/services/globalVariable/globalvariable.service';



@Component({
  selector: 'app-product-carousel-two',
  templateUrl: './product-carousel-two.component.html',
  styleUrls: ['./product-carousel-two.component.sass']
})
export class ProductCarouselTwoComponent implements OnInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input('product') product: Array<Product> = [];
  public config: SwiperConfigInterface = {};
  products: Product[];
  listproduits: any;



  constructor(
    private cartService: CartService,
    private productsService: ProductService, private wishlistService: WishlistService,
    private dialog: MatDialog, private router: Router,
    public cart2Service: Cart2Service, public globalvariableService: GlobalvariableService
  ) { }
  //  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  ngOnInit() {
    this.cart2Service.getProductList().subscribe(data => this.listproduits = data);
  }
  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 5,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },


      }
    }
  }

  // Add to cart
  public addToCart(product: Product) {
    let quantity: number = 1;
    this.cartService.addToCart(product, quantity);
    console.log(product, quantity);
    let first_item = { quantity: quantity, product: product }
    if (this.isEmptyBasket()) {
      this.cart2Service.addItem(first_item).subscribe((data: any) => {
        console.log("aaa", data);
        this.setBasketId(data.basket.id);
      });
    } else {
      let _item = { quantity: quantity, product: product, basket: {id: this.cart2Service.getBasketId()} }
      this.cart2Service.addItem(_item).subscribe(data => {
        console.log("bbb", data);
      });
    }

  }




  public isEmptyBasket() {
    return isNaN(parseInt(localStorage.getItem("basketID")));
  }


  // public getBasketId() {
  //   return parseInt(localStorage.getItem("basketID"));
  // }
  public setBasketId(id: string) {
    localStorage.setItem("basketID", id);
  }

   // Add to compare
 /*  public addToCompare(product: Product) {
     this.productsService.addToCompare(product);
  }*/




  // Add to wishlist
  public addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
  }

  // Add to compare
  public addToCompare(product: Product) {
    this.productsService.addToCompare(product);
  }


  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }
}
