import { TestBed, inject } from '@angular/core/testing';

import { DomScriptLoaderService } from './dom-script-loader.service';

describe('DomScriptLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomScriptLoaderService]
    });
  });

  it('should be created', inject([DomScriptLoaderService], (service: DomScriptLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
