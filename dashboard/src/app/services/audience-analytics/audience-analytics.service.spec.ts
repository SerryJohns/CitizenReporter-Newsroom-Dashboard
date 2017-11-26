import { TestBed, inject } from '@angular/core/testing';

import { AudienceAnalyticsService } from './audience-analytics.service';

describe('AudienceAnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudienceAnalyticsService]
    });
  });

  it('should be created', inject([AudienceAnalyticsService], (service: AudienceAnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
