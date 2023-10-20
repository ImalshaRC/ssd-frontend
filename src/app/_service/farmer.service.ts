// @ts-nocheck
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenTimeoutService } from './token-timeout.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  item;

  constructor(private http: HttpClient, private router: Router, private tokenTimeoutService: TokenTimeoutService) {
  }

  addItem(item): Observable<any> {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.post<any>('http://localhost:8082' + "/farmer/addItem", item, {headers: headersToken});
  }

  updateItem(item, itemId): Observable<any> {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.put<any>('http://localhost:8082' + "/farmer/updateItem/" + itemId, item, {headers: headersToken});
  }

  removeItem(itemId): Observable<any> {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.delete<any>(environment.backend_farmer_service + "/farmer/removeItem/" + itemId, {headers: headersToken});
  }

  getItems(): Observable<any> {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }

    // Make the GET request with the custom headers
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.get<any>(
      environment.backend_farmer_service + "/farmer/getItems/" + JSON.parse(localStorage.getItem('user')).email,
      {headers: headersToken}
    );
    // return this.http.get<any>(environment.backend_farmer_service + "/farmer/getItems/" + JSON.parse(localStorage.getItem('user')).email);
  }

  addChat(setItem: any): Observable<any> {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    console.log(setItem)
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.post(environment.backend_farmer_service + "/farmer/addChat", setItem, {headers: headersToken});
  }

  getAllChats(): Observable<any> {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.get<any>(environment.backend_farmer_service + "/farmer/getchat", {headers: headersToken});
  }

  chkToken(): Observable<any> {
    if (this.tokenTimeoutService.checkTimeout()) {
      return;
    }
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.get<any>(environment.backend_farmer_service + "/farmer/chkToken/" + this.getLocalStorage('user').email, {headers: headersToken});
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
