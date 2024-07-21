import { TestBed } from '@angular/core/testing';

import { ExtApiService } from './ext-api.service';

describe('ExtApiService', () => {
  let service: ExtApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
