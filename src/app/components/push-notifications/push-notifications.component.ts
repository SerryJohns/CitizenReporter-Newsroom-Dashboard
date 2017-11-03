import { Component, OnInit } from '@angular/core';
import { SendPushNotificationService } from './../../services/notifications/send-push-notification.service';
import { GetLocationsService } from './../../services/notifications/get-locations.service';
import { Audience } from './../../models/audience.model';

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.css'],
  providers: [ SendPushNotificationService, GetLocationsService ]
})
export class PushNotificationsComponent implements OnInit {

  constructor(
    private sendPushNotificationsService: SendPushNotificationService,
    private getLocationsService: GetLocationsService
  ) { }

  today: Date = new Date();
  locations: String[] = [];
  message: String;
  audience: String;
  location: String;
  success: boolean;
  showProgressBar: boolean;
  msg: String;

  ngOnInit() {
    this.showProgressBar = false;
    this.success = false;
    this.getLocationsService.getLocations().subscribe(
      (location) => this.locations.push(location)
    );
  }

  closeAlert(): void {
    this.msg = null;
    this.showProgressBar = false;
  }

  sendPushNotification(): void {
    let audience: Audience;
    if (!this.message) {
      this.msg = 'Please provide a push notification message!';
      this.success = false;
      return;
    }

    switch (this.audience) {
      case 'all':
        audience = <Audience>({
          field: 'deviceType',
          value: 'android'
        });
        break;
      case 'location':
        if (!this.location) {
          this.msg = 'Please provide a location!';
          this.success = false;
          return;
        }
        audience = <Audience>({
          field: 'timeZone',
          value: this.location
        });
        break;
    }
    this.showProgressBar = true;
    this.sendPushNotificationsService.sendPushNotification(this.message, audience)
    .then((result) => {
      this.msg = 'Push notification sent successfully';
      this.success = true;
      this.showProgressBar = false;
    }).catch((err) => {
      this.msg = err;
      this.success = false;
      this.showProgressBar = false;
    });
  }

}
