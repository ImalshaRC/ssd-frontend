import {Component, OnInit} from '@angular/core';
import {LoginService} from "../_service/login.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    accountType: 'buyer',
    name: '',
    contactNo: '',
    email: '',
    address: '',
    password: ''
  }

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginService.signUp(this.user).subscribe((reply) => {
      this.router.navigate(['/'])
    })
  }
}


