/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalendarioService } from './calendario.service';

describe('Service: Calendario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarioService]
    });
  });

  it('should ...', inject([CalendarioService], (service: CalendarioService) => {
    expect(service).toBeTruthy();
  }));
});
