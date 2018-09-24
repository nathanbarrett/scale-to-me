import { TestBed, inject } from '@angular/core/testing';

import { SolarSystemGlobeService } from './solar-system-globe.service';

describe('SolarSystemGlobeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolarSystemGlobeService]
    });
  });

  it('should be created', inject([SolarSystemGlobeService], (service: SolarSystemGlobeService) => {
    expect(service).toBeTruthy();
  }));
});
