/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerColegioComponent } from './ver-colegio.component';

describe('VerColegioComponent', () => {
  let component: VerColegioComponent;
  let fixture: ComponentFixture<VerColegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerColegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
