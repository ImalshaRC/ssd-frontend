// @ts-nocheck
import {Component, OnInit} from '@angular/core';
import {FarmerService} from "../../../../_service/farmer.service";
import {environment} from "../../../../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {window} from "rxjs/operators";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-farmer-items-view',
  templateUrl: './farmer-items-view.component.html',
  styleUrls: ['./farmer-items-view.component.css']
})
export class FarmerItemsViewComponent implements OnInit {

  items!: any[];

  constructor(private farmerS: FarmerService, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.farmerS.getItems().subscribe(items => {
        this.items = items;
    },(error) => {
      console.log('error',error);
      this.router.navigate(['/']);
      localStorage.clear();
    });


  }

  setItem(item) {
    this.farmerS.item = item;
    this.router.navigate(['/main/farmer/manage_items'])
  }

  getImageSrc(itemPackageImage) {
    // console.log(itemPackageImage)
    // let imageData = 'data:' + itemImg.itemImgType + ';base64,' + itemImg.itemImg;
    // return this.sanitizer.bypassSecurityTrustUrl(imageData);
    return this.sanitizer.bypassSecurityTrustUrl(environment.image_url + itemPackageImage.imgName);
  }

  getQty(qty) {
    let qtys = ((qty / 1000) + '').split('.');
    if (qtys.length === 2) {
      return ((qty / 1000) + '').split('.')[0] + 'Kg ' + ((qty % 1000) + '').split('.')[0] + 'g'
    }
    return qtys[0] + 'Kg'
  }
}
