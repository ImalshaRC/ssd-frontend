// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import {FarmerService} from "../../../_service/farmer.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private farmerService: FarmerService) { }
  c = {
    chatId: '',
    chatterName: '',
    msg: ''
  };

  chatyou = [];
  interval: any;

  ngOnInit(): void {
   this.c.chatterName =localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') as string)['name'] : ''
    console.log(localStorage.getItem('user'))
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
       this.getAllChats();
    }, 1000);
  }

  onSubmit() {
    this.farmerService.addChat(this.c).subscribe( data => {
      console.log(data);
    });
  }
  getAllChats() {
    this.farmerService.getAllChats().subscribe(data => {
      this.chatyou = data;
      console.log(data);
    });
  }

}
