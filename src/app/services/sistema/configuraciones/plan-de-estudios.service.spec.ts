/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanDeEstudiosService } from './plan-de-estudios.service';

describe('Service: PlanDeEstudios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanDeEstudiosService]
    });
  });

  it('should ...', inject([PlanDeEstudiosService], (service: PlanDeEstudiosService) => {
    expect(service).toBeTruthy();
  }));
});
