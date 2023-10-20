// @ts-nocheck
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenTimeoutService} from "./token-timeout.service";

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  cart;

  constructor(private http: HttpClient, private router: Router, public tokenTimeoutService : TokenTimeoutService) {
  }

  getItems(txt): Observable<any> {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.get<any>(environment.backend_buyer_service + "/buyer/getItems/" + txt, {headers: headersToken});
  }

  getDeliveries(): Observable<any> {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.get<any>(environment.backend_url4 + "/delivery/getDeliveries", {headers: headersToken});
  }

  addToCart(cart) {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    return this.http.post<any>(environment.backend_buyer_service + "/buyer/addToCart", cart);
  }

  getCart() {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    console.log(JSON.parse(localStorage.getItem('user')).email)
    return this.http.get<any>(environment.backend_buyer_service + "/buyer/getCart/" + JSON.parse(localStorage.getItem('user')).email, {headers: headersToken});
  }

  addCart(cart) {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    return this.http.post<any>(environment.backend_buyer_service + "/buyer/addCart", cart)
  }

  removeItem(id) {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    return this.http.delete<any>(environment.backend_buyer_service + "/buyer/removeCartDetail/" + id)
  }

  //================================

  getLocalStorage(tokenTtype) {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    if (tokenTtype === 'user') {
      if (JSON.parse(localStorage.getItem(tokenTtype)) !== null) {
        return JSON.parse(localStorage.getItem(tokenTtype))
      } else {
        this.router.navigate(['/'])
        localStorage.clear()
      }
    } else if (tokenTtype === 'UserType') {
      if (localStorage.getItem(tokenTtype) !== null) {
        return localStorage.getItem(tokenTtype)
      } else {
        this.router.navigate(['/'])
        localStorage.clear()
      }
    }
  }
}
