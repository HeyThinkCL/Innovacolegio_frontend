/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EtniasService } from './etnias.service';

describe('Service: Etnias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtniasService]
    });
  });

  it('should ...', inject([EtniasService], (service: EtniasService) => {
    expect(service).toBeTruthy();
  }));
});
