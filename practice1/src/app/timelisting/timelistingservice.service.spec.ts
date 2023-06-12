import { TestBed } from '@angular/core/testing';

import { TimelistingserviceService } from './timelistingservice.service';

describe('TimelistingserviceService', () => {
  let service: TimelistingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelistingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
