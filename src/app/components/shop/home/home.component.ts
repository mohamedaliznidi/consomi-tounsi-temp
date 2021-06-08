import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from 'src/app/modals/product.model';
import { PublicityService } from './publicity.service';
import { Publicity } from './publicity';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  products: Product[];
  slides1: Publicity[];
  public banners = [];
  public slides = [
    { title: 'Your Well Being is our Priority', subtitle: 'More about Healthy score', image: 'https://images.pexels.com/photos/4350223/pexels-photo-4350223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { title: 'Discover Our Products', subtitle: 'We ensure Diversity.', image: 'https://images.pexels.com/photos/5490824/pexels-photo-5490824.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { title: 'What About the Environement ?', subtitle: 'Respect the Environment By Eco shopping !', image: 'https://images.pexels.com/photos/3889990/pexels-photo-3889990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  ];

  constructor(private productService: ProductService, private publicityservice: PublicityService) { }

  ngOnInit() {

    this.publicityservice.publicities().subscribe(
      (publicity: Publicity[]) => {
        this.slides1 = publicity;
        console.log(this.slides1)

      }
    )

    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );

 this.productService.getProducts()
 .subscribe(
   (product: Product[]) => {
     this.products = product
   }
 ) ;

 

  }






}
