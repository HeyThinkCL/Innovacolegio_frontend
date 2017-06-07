/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnotacionesService } from './anotaciones.service';

describe('Service: Anotaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnotacionesService]
    });
  });

  it('should ...', inject([AnotacionesService], (service: AnotacionesService) => {
    expect(service).toBeTruthy();
  }));
});
