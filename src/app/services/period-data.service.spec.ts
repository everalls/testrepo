import { TestBed } from '@angular/core/testing';

import { PeriodDataService } from './period-data.service';

describe('PeriodDataService', () => {
  let service: PeriodDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
