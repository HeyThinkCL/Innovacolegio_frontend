/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsignaturasEspecialesService } from './asignaturas-especiales.service';

describe('Service: AsignaturasEspeciales', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsignaturasEspecialesService]
    });
  });

  it('should ...', inject([AsignaturasEspecialesService], (service: AsignaturasEspecialesService) => {
    expect(service).toBeTruthy();
  }));
});
