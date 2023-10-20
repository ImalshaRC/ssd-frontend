// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getUser(){
    if (this.router.url.includes('farmer')) {
      return 'farmer'
    } else if (this.router.url.includes('buyer')) {
      return 'buyer'
    }
    // return JSON.parse(localStorage.getItem('user'));
  }

}
