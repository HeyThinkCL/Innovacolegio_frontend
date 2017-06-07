/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfigNotasService } from './config-notas.service';

describe('Service: ConfigNotas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigNotasService]
    });
  });

  it('should ...', inject([ConfigNotasService], (service: ConfigNotasService) => {
    expect(service).toBeTruthy();
  }));
});
