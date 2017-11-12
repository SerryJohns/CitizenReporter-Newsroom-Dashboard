import { TestBed, inject } from '@angular/core/testing';

import { GetStoriesService } from './get-stories.service';

describe('GetStoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetStoriesService]
    });
  });

  it('should be created', inject([GetStoriesService], (service: GetStoriesService) => {
    expect(service).toBeTruthy();
  }));
});
