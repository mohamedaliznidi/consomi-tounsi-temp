import { Component, OnInit, Input } from '@angular/core';
import { Publicity } from '../../shop/home/publicity';
import { PublicityService } from '../../shop/home/publicity.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.sass']
})
export class BannersComponent implements OnInit {
  public slides1 : Array<any>;
  @Input('banners') banners: Array<any> = [];

  constructor(private publicityservice :PublicityService) { }

  ngOnInit() {
    this.publicityservice.publicities().subscribe(
      (publicity: Publicity[]) => {
        this.slides1 = publicity;
      }

    )
  }

 public getBanner(index){
    return this.banners[index];
  }

  public getBgImage(slide){
    let bgImage = {
      'background-image': slide.publicitycategory != null ? "url(" + slide.image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
    };
        return bgImage;
  }
}
