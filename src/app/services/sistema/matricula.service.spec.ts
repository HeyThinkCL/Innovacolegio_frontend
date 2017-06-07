/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatriculaService } from './matricula.service';

describe('Service: Matricula', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatriculaService]
    });
  });

  it('should ...', inject([MatriculaService], (service: MatriculaService) => {
    expect(service).toBeTruthy();
  }));
});
