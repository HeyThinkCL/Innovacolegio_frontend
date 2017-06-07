/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InformesService } from './informes.service';

describe('Service: Informes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InformesService]
    });
  });

  it('should ...', inject([InformesService], (service: InformesService) => {
    expect(service).toBeTruthy();
  }));
});
