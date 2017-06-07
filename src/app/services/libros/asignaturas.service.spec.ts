/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AsignaturasService } from './asignaturas.service';

describe('Service: Asignaturas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsignaturasService]
    });
  });

  it('should ...', inject([AsignaturasService], (service: AsignaturasService) => {
    expect(service).toBeTruthy();
  }));
});
