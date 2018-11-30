import { TestBed, inject } from '@angular/core/testing';

import { EdserService } from './edser.service';

describe('EdserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdserService]
    });
  });

  it('should be created', inject([EdserService], (service: EdserService) => {
    expect(service).toBeTruthy();
  }));
});
