import { TestBed, inject } from '@angular/core/testing';

import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateUserService]
    });
  });

  it('should be created', inject([CreateUserService], (service: CreateUserService) => {
    expect(service).toBeTruthy();
  }));
});
