/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerElectivosComponent } from './ver-electivos.component';

describe('VerElectivosComponent', () => {
  let component: VerElectivosComponent;
  let fixture: ComponentFixture<VerElectivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerElectivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerElectivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
