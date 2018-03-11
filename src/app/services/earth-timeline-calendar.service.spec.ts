import { TestBed, inject } from '@angular/core/testing';

import { EarthTimelineCalendarService } from './earth-timeline-calendar.service';

describe('EarthTimelineCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EarthTimelineCalendarService]
    });
  });

  it('should be created', inject([EarthTimelineCalendarService], (service: EarthTimelineCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
