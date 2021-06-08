import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrandsService } from './brands.service';
import { HttpErrorResponse } from '@angular/common/http';
export interface Productcategory{
  int : number;
  categoryName:string;
      
  }

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit {

  // brands: string[] = ['all', 'Lenovo', 'Dell', 'Dell', 'Lg', 'Samsung'];
  brands: string[] = ['all', 'Brand-1', 'Brand-2', 'Brand-3', 'Brand-4', 'Brand-5'];
  public productcategories : Productcategory[];
  @Output() brandChanged = new EventEmitter();
  constructor(private productcategoryservice : BrandsService) {
    this.productcategories =[];
  }

  ngOnInit() {
    this.getProductCategories();
  }
  public getProductCategories(): void {
    this.productcategoryservice.getProductcategories().subscribe(

        (response: Productcategory[])=> {
          this.productcategories=response;
        

        },
        (error: HttpErrorResponse)=> {
          alert(error.message);
        }
      );
      
    }
    


  brendSelect(event) {
  this.brandChanged.emit(
    event.value
  );
  }

}
