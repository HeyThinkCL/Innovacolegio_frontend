/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CursoListaComponent } from './curso-lista.component';

describe('CursoListaComponent', () => {
  let component: CursoListaComponent;
  let fixture: ComponentFixture<CursoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
