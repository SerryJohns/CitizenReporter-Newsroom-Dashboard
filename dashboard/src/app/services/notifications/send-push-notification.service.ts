import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Audience } from './../../models/audience.model';

@Injectable()
export class SendPushNotificationService {

  sendPushNotification(message: String, audience: Audience): Promise<boolean> {
    const query = new Parse.Query(Parse.Installation);
    query.equalTo(audience.field, audience.value);
    return new Promise<boolean>((resolve, reject) => {
      Parse.Push.send({
        where: query,
        data: {
          alert: message
        }
      }, { useMasterKey: true }).then(
        () => {
          resolve(true);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

}
