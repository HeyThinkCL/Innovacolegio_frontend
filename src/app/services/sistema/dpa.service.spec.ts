/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DpaService } from './dpa.service';

describe('Service: Dpa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DpaService]
    });
  });

  it('should ...', inject([DpaService], (service: DpaService) => {
    expect(service).toBeTruthy();
  }));
});
