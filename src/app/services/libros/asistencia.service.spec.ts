/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsistenciaService } from './asistencia.service';

describe('Service: Asistencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsistenciaService]
    });
  });

  it('should ...', inject([AsistenciaService], (service: AsistenciaService) => {
    expect(service).toBeTruthy();
  }));
});
