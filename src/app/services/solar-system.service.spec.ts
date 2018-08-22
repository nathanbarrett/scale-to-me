import { TestBed, inject } from '@angular/core/testing';

import { SolarSystemService } from './solar-system.service';

describe('SolarSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolarSystemService]
    });
  });

  it('should be created', inject([SolarSystemService], (service: SolarSystemService) => {
    expect(service).toBeTruthy();
  }));
});
