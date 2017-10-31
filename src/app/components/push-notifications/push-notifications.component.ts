import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.css']
})
export class PushNotificationsComponent implements OnInit {

  constructor() { }
  today: Date = new Date();
  message: String;
  audience: String;
  location: String;

  ngOnInit() {
  }

}
