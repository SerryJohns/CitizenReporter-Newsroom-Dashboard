import { TestBed, inject } from '@angular/core/testing';

import { StoryMediaService } from './story-media.service';

describe('StoryMediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryMediaService]
    });
  });

  it('should be created', inject([StoryMediaService], (service: StoryMediaService) => {
    expect(service).toBeTruthy();
  }));
});
