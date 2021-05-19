import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from 'src/app/modals/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  products: Product[];
  public banners = [];
  public slides = [
    { title: 'Huge sale', subtitle: 'Up to 70%', image: 'https://i.ytimg.com/vi/geSsc5Go9bM/maxresdefault.jpg' },
    { title: '', subtitle: 'Check the promotion', image: 'https://abancommercials.com/fr/uploadComercial/8186.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'https://i.ytimg.com/vi/0kMQ9M_BUTU/maxresdefault.jpg' },
    { title: '', subtitle: '', image: 'https://insatpress.tn/wp-content/uploads/2019/10/74687703_2446395278934399_4567828526819966976_n.jpg' },
    { title: 'Massive sale', subtitle: '', image: 'https://www.seraphine.net/images/garnier-ultra-doux.jpg' }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );

 this.productService.getProducts()
 .subscribe(
   (product: Product[]) => {
     this.products = product
   }
 )

  }






}
