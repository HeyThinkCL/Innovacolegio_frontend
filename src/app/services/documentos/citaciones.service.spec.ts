/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CitacionesService } from './citaciones.service';

describe('Service: Citaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitacionesService]
    });
  });

  it('should ...', inject([CitacionesService], (service: CitacionesService) => {
    expect(service).toBeTruthy();
  }));
});
