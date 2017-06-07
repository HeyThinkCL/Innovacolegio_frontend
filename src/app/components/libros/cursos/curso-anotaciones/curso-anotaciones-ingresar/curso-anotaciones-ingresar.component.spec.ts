/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CursoAnotacionesIngresarComponent } from './curso-anotaciones-ingresar.component';

describe('CursoAnotacionesIngresarComponent', () => {
  let component: CursoAnotacionesIngresarComponent;
  let fixture: ComponentFixture<CursoAnotacionesIngresarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoAnotacionesIngresarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoAnotacionesIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
