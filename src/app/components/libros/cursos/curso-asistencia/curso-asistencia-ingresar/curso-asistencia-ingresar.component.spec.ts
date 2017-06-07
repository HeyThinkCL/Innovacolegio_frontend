/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CursoAsistenciaIngresarComponent } from './curso-asistencia-ingresar.component';

describe('CursoAsistenciaIngresarComponent', () => {
  let component: CursoAsistenciaIngresarComponent;
  let fixture: ComponentFixture<CursoAsistenciaIngresarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoAsistenciaIngresarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoAsistenciaIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
