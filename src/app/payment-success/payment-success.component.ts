// @ts-nocheck
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BuyerService} from "../_service/buyer.service";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  payId;
  cart;

  constructor(private route: ActivatedRoute, private buyerS: BuyerService) {
    this.route.queryParams.subscribe(params => {
      this.payId = params['payId'];
      console.log(this.payId)
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.cart.payId = this.payId;
      this.cart.userAccount = JSON.parse(localStorage.getItem('user'))
      this.buyerS.addCart(this.cart).subscribe((reply) => {

      })
    })
  }

  ngOnInit(): void {

  }

}
