// @ts-nocheck
import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../../_service/navbar.service";
import {BuyerService} from "../../../_service/buyer.service";
import {FarmerService} from "../../../_service/farmer.service";

@Component({
  selector: 'app-nav-farmer',
  templateUrl: './nav-farmer.component.html',
  styleUrls: ['./nav-farmer.component.css']
})
export class NavFarmerComponent implements OnInit {

  constructor(private navBarService: NavbarService, private farmerS: FarmerService) {
  }

  ngOnInit(): void {
  }

  setTopic(topic) {
    this.navBarService.navTopic.next(topic);
  }

  resetItem() {
    this.farmerS.item = undefined;
  }
}
