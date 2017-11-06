import { TestBed, inject } from '@angular/core/testing';

import { EventsAnalyticsService } from './events-analytics.service';

describe('EventsAnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsAnalyticsService]
    });
  });

  it('should be created', inject([EventsAnalyticsService], (service: EventsAnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
