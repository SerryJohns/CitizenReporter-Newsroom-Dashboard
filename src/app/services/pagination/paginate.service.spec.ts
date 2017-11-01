import { TestBed, inject } from '@angular/core/testing';

import { PaginateService } from './paginate.service';

describe('PaginateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginateService]
    });
  });

  it('should be created', inject([PaginateService], (service: PaginateService) => {
    expect(service).toBeTruthy();
  }));
});
