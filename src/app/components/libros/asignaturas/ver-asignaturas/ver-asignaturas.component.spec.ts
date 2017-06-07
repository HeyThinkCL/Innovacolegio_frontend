/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerAsignaturasComponent } from './ver-asignaturas.component';

describe('VerAsignaturasComponent', () => {
  let component: VerAsignaturasComponent;
  let fixture: ComponentFixture<VerAsignaturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAsignaturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
