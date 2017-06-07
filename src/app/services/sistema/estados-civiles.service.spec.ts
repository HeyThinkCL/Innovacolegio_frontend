/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstadosCivilesService } from './estados-civiles.service';

describe('Service: EstadosCiviles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadosCivilesService]
    });
  });

  it('should ...', inject([EstadosCivilesService], (service: EstadosCivilesService) => {
    expect(service).toBeTruthy();
  }));
});
