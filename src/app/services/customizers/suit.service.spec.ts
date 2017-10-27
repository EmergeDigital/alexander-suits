import { TestBed, inject } from '@angular/core/testing';

import { SuitService } from './suit.service';

describe('SuitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuitService]
    });
  });

  it('should be created', inject([SuitService], (service: SuitService) => {
    expect(service).toBeTruthy();
  }));
});
