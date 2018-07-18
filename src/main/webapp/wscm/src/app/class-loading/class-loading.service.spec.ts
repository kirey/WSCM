import { TestBed, inject } from '@angular/core/testing';

import { ClassLoadingService } from './class-loading.service';

describe('ClassLoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassLoadingService]
    });
  });

  it('should be created', inject([ClassLoadingService], (service: ClassLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
