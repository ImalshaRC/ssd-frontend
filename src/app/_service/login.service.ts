// @ts-nocheck
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  accUser(email): Observable<any> {
    return this.http.get<any>(environment.backend_user_service + "/user/user/" + email);
  }

  loginGoogle(user): Observable<any> {
    return this.http.post<any>(environment.backend_user_service + "/user/login_google", user);
  }

  accLogin(user): Observable<any> {
    return this.http.post<any>(environment.backend_user_service + "/user/login", user);
  }

  signUp(user): Observable<any> {
    return this.http.post<any>(environment.backend_user_service + "/user/signUp", user);
  }

  accLogout() {
    // this.navBarService.logged = false;
    localStorage.clear();
  }

  chkToken(): Observable<any> {
    const headersToken = new HttpHeaders()
      .set('X-CSRF-TOKEN', this.getLocalStorage('user').token) // Replace with your header name and value
      .set('USER', this.getLocalStorage('user').email)
      .set('UserType', this.getLocalStorage('UserType'));
    return this.http.get<any>(environment.backend_user_service + "/user/chkToken/" + this.getLocalStorage('user').email, {headers: headersToken});
  }

  //================================

  getLocalStorage(tokenTtype) {
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
