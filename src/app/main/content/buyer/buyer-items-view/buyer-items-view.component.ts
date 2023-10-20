// @ts-nocheck
import {Component, OnInit} from '@angular/core';
import {FarmerService} from "../../../../_service/farmer.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {BuyerService} from "../../../../_service/buyer.service";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-buyer-items-view',
  templateUrl: './buyer-items-view.component.html',
  styleUrls: ['./buyer-items-view.component.css']
})
export class BuyerItemsViewComponent implements OnInit {

  items!: any[];
  txt;

  constructor(private buyerS: BuyerService, private sanitizer: DomSanitizer, private router: Router, private decimalPipe: DecimalPipe) {
  }

  ngOnInit(): void {
    this.getItems();
    console.log(((10 % 1000) + '').split('.'))
    console.log(parseInt(((10 / 1000) + '').split('.')[1])*100)
  }

  getItems() {
    if (this.txt === '') {
      this.txt = undefined;
    }
    this.buyerS.getItems(this.txt).subscribe(items => {
      console.log(items)
      this.items = items;
    },(error) => {
      console.log('error',error);
      this.router.navigate(['/']);
      localStorage.clear();
    })
  }

  getImageSrc(itemPackageImage) {
    // console.log(itemPackageImage)
    // let imageData = 'data:' + itemImg.itemImgType + ';base64,' + itemImg.itemImg;
    // return this.sanitizer.bypassSecurityTrustUrl(imageData);
    return this.sanitizer.bypassSecurityTrustUrl(environment.image_url + itemPackageImage.imgName);
  }

  addToCart(item) {
    item.bQty = item.gVal + item.kgVal * 1000;
    let cart = {
      quantity: item.bQty,
      item: item,
      userAccount: {
        email: JSON.parse(localStorage.getItem('user')).email
      }
    }
    console.log(item)
    this.buyerS.addToCart(cart).subscribe((itemObj) => {
      item.qty -= item.bQty;
    },(error) => {
      console.log('error',error);
      this.router.navigate(['/']);
      localStorage.clear();
    })
  }

  getQty(qty) {
    let qtys = ((qty / 1000) + '').split('.');
    if (qtys.length === 2) {
      return ((qty / 1000) + '').split('.')[0] + 'Kg ' + ((qty % 1000) + '').split('.')[0] + 'g'
    }
    return qtys[0] + 'Kg'
  }
}
