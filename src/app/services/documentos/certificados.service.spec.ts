/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CertificadosService } from './certificados.service';

describe('Service: Certificados', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CertificadosService]
    });
  });

  it('should ...', inject([CertificadosService], (service: CertificadosService) => {
    expect(service).toBeTruthy();
  }));
});
