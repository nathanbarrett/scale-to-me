import { TestBed, inject } from '@angular/core/testing';

import { MilkyWayService } from './milky-way.service';

describe('MilkyWayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MilkyWayService]
    });
  });

  it('should be created', inject([MilkyWayService], (service: MilkyWayService) => {
    expect(service).toBeTruthy();
  }));
});
