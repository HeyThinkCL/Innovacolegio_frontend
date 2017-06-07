/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ByTipoEnsenanzaComponent } from './by-tipo-ensenanza.component';

describe('ByTipoEnsenanzaComponent', () => {
  let component: ByTipoEnsenanzaComponent;
  let fixture: ComponentFixture<ByTipoEnsenanzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByTipoEnsenanzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByTipoEnsenanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
