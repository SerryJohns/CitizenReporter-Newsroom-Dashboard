import { TestBed, inject } from '@angular/core/testing';

import { SendPushNotificationService } from './send-push-notification.service';

describe('SendPushNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendPushNotificationService]
    });
  });

  it('should be created', inject([SendPushNotificationService], (service: SendPushNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
