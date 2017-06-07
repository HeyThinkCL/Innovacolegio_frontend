/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlumnosService } from './curso-alumnos.service';

describe('Service: Alumnos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlumnosService]
    });
  });

  it('should ...', inject([AlumnosService], (service: AlumnosService) => {
    expect(service).toBeTruthy();
  }));
});
