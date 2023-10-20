// @ts-nocheck
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {Observable, Subject} from 'rxjs';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // strict discovery document disallows urls which not start with issuers url
  strictDiscoveryDocumentValidation: false,

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '964972285323-eth3havri7810ocu1khh611bdcmvcbgl.apps.googleusercontent.com',

  // set the scope for the permissions the client should request
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',

  showDebugInformation: true,
};

export interface UserInfo {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  gmail = 'https://gmail.googleapis.com'

  userProfileSubject = new Subject<UserInfo>()

  constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient, private loginService: LoginService,private router: Router) {

  }

  loginGoogle() {
    // confiure oauth2 service
    this.oAuthService.configure(authCodeFlowConfig);
    // manually configure a logout url, because googles discovery document does not provide it
    this.oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";

    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url
    this.oAuthService.loadDiscoveryDocument().then(() => {
      // // This method just tries to parse the token(s) within the url when
      // // the auth-server redirects the user back to the web-app
      // // It doesn't send the user the the login page
      this.oAuthService.tryLoginImplicitFlow().then(() => {

        // when not logged in, redirecvt to google for login
        // else load user profile
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow()
        } else {
          this.oAuthService.loadUserProfile().then((userProfile) => {
            // console.log(userProfile['email'])
            let user = {
              email: userProfile['email']
            }
            this.loginService.loginGoogle(user).subscribe((user) => {
              console.log(user)
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('UserType', user['userToken']);
              if (user !== null && user['accountType'] === 'farmer') {
                this.router.navigate(['/main/farmer/view_items'])
              } else if (user['accountType'] === 'buyer') {
                this.router.navigate(['/main/buyer/view_items']);
              }
            }, (err) => {
              // this.logged = false;
            })
            // console.log(userProfile['info']['email'])
            // this.userProfileSubject.next(userProfile as UserInfo)
          })
        }

      })
    });
  }

  emails(userId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages`, {headers: this.authHeader()})
  }

  getMail(userId: string, mailId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages/${mailId}`, {headers: this.authHeader()})
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signOut() {
    this.loginService.accLogout()
    // this.oAuthService.logOut()
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    })
  }
}

// // @ts-nocheck
// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleAuthService {
//   private clientId = '1089856297048-repi3v53369raqou6il4ap9d3ru59h64.apps.googleusercontent.com'; // Replace with your client ID
//   private scopes = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
//
//   constructor() {
//     gapi.load('auth2', () => {
//       gapi.auth2.init({
//         client_id: this.clientId,
//       });
//     });
//   }
//
//   signIn(): Promise<void> {
//     return gapi.auth2.getAuthInstance().signIn({
//       scope: this.scopes,
//     });
//   }
//
//   getAccessToken(): string {
//     return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
//   }
//
//   signOut(): Promise<void> {
//     return gapi.auth2.getAuthInstance().signOut();
//   }
// }
