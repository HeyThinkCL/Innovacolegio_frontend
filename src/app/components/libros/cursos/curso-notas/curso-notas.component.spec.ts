/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CursoNotasComponent } from './curso-notas.component';

describe('CursoNotasComponent', () => {
  let component: CursoNotasComponent;
  let fixture: ComponentFixture<CursoNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
