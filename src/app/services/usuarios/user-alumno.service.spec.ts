/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAlumnoService } from './user-alumno.service';

describe('Service: UserAlumno', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAlumnoService]
    });
  });

  it('should ...', inject([UserAlumnoService], (service: UserAlumnoService) => {
    expect(service).toBeTruthy();
  }));
});
