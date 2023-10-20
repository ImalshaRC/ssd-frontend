// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import {NavbarService} from "../../../_service/navbar.service";

@Component({
  selector: 'app-nav-buyer',
  templateUrl: './nav-buyer.component.html',
  styleUrls: ['./nav-buyer.component.css']
})
export class NavBuyerComponent implements OnInit {

  constructor(private navBarService: NavbarService) { }

  ngOnInit(): void {
  }

  setTopic(topic){
    this.navBarService.navTopic.next(topic);
  }
}
