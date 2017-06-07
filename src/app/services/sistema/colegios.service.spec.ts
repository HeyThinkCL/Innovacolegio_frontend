/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ColegiosService } from './colegios.service';

describe('Service: Colegios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColegiosService]
    });
  });

  it('should ...', inject([ColegiosService], (service: ColegiosService) => {
    expect(service).toBeTruthy();
  }));
});
