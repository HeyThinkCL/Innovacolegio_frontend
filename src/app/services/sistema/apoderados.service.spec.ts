/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApoderadosService } from './apoderados.service';

describe('Service: Apoderados', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApoderadosService]
    });
  });

  it('should ...', inject([ApoderadosService], (service: ApoderadosService) => {
    expect(service).toBeTruthy();
  }));
});
