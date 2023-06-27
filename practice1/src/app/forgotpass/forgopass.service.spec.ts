import { TestBed } from '@angular/core/testing';

import { ForgopassService } from './forgopass.service';

describe('ForgopassService', () => {
  let service: ForgopassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgopassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
