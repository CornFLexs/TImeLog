import { TestBed } from '@angular/core/testing';

import { RegesterserviceService } from './regesterservice.service';

describe('RegesterserviceService', () => {
  let service: RegesterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegesterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
