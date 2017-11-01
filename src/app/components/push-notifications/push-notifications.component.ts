import { Component, OnInit } from '@angular/core';
import { SendPushNotificationService } from './../../services/notifications/send-push-notification.service';
import { Audience } from './audience.model';

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.css'],
  providers: [ SendPushNotificationService ]
})
export class PushNotificationsComponent implements OnInit {

  constructor(private sendPushNotificationsService: SendPushNotificationService ) { }

  today: Date = new Date();
  message: String;
  audience: String;
  location: String;
  result: boolean;
  success: boolean;
  msg: String;

  ngOnInit() {
    this.success = false;
  }

  sendPushNotification(): void {
    let audience: Audience;
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
    console.log(audience);
    // this.sendPushNotificationsService.sendPushNotification(this.message, audience)
    // .then((result) => {
    //   this.msg = 'Push notification sent successfully';
    //   this.success = true;
    // })
    // .catch((err) => {
    //   this.msg = err;
    //   this.success = false;
    // });
  }

}
