/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CursoAnotacionesVerComponent } from './curso-anotaciones-ver.component';

describe('CursoAnotacionesVerComponent', () => {
  let component: CursoAnotacionesVerComponent;
  let fixture: ComponentFixture<CursoAnotacionesVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoAnotacionesVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoAnotacionesVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
