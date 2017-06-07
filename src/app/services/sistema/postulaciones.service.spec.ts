/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostulacionesService } from './postulaciones.service';

describe('Service: Postulaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostulacionesService]
    });
  });

  it('should ...', inject([PostulacionesService], (service: PostulacionesService) => {
    expect(service).toBeTruthy();
  }));
});
