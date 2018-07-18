import { TestBed, inject } from '@angular/core/testing';

import { ClassLoadingCategoriesService } from './class-loading-categories.service';

describe('ClassLoadingCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassLoadingCategoriesService]
    });
  });

  it('should be created', inject([ClassLoadingCategoriesService], (service: ClassLoadingCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
