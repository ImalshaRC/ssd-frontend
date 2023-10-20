// @ts-nocheck
import {Component, OnInit} from '@angular/core';
import {LoginService} from "../_service/login.service";
import {NavbarService} from "../_service/navbar.service";
import {Router} from "@angular/router";
import {AppConstants} from '../common/app.constants';
import {ActivatedRoute} from '@angular/router';
// import {GoogleApiService, UserInfo} from '../_service/google-api.service';
import {GoogleAuthService} from "../_service/google-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  logged = true;

  userInfo?: UserInfo

  constructor(private loginService: LoginService, private route: ActivatedRoute, private navBarService: NavbarService, private router: Router, private oAuthS: GoogleAuthService) {

  }

  ngOnInit(): void {

  }

  loginGoogle() {
    this.oAuthS.loginGoogle()
  }

  // loginGoogle(){
  //   const userEmail=localStorage.getItem('email') !== null ? localStorage.getItem('email') : ''
  //   console.log(userEmail)
  //   if(userEmail){
  //     this.loginService.accUser(userEmail).subscribe((user) => {
  //       localStorage.setItem('user', JSON.stringify(user));
  //       localStorage.setItem('UserType', user['userToken']);
  //       if (user !== null && user['accountType'] === 'farmer') {
  //         this.router.navigate(['/main/farmer/view_items'])
  //       } else if (user['accountType'] === 'buyer') {
  //         this.router.navigate(['/main/buyer/view_items']);
  //       } else {
  //         this.logged = false;
  //       }
  //     }, (err) => {
  //       this.logged = false;
  //     })
  //   }
  //   // Use the userEmail in your application logic
  // }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  onSubmit() {
    this.loginService.accLogin(this.user).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('UserType', user['userToken']);
      if (user !== null && user['accountType'] === 'farmer') {
        this.router.navigate(['/main/farmer/view_items'])
      } else if (user['accountType'] === 'buyer') {
        this.router.navigate(['/main/buyer/view_items']);
      } else {
        this.logged = false;
      }
    });
  }
}
