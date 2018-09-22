import { TestBed, inject } from '@angular/core/testing';

import { ElementVisibilityService } from './element-visibility.service';

describe('ElementVisibilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementVisibilityService]
    });
  });

  it('should be created', inject([ElementVisibilityService], (service: ElementVisibilityService) => {
    expect(service).toBeTruthy();
  }));
});
