/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CursoNotasIngresarComponent } from './curso-notas-ingresar.component';

describe('CursoNotasIngresarComponent', () => {
  let component: CursoNotasIngresarComponent;
  let fixture: ComponentFixture<CursoNotasIngresarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoNotasIngresarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoNotasIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
