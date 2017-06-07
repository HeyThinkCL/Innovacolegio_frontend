/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CursoAnotacionesVerGenComponent } from './curso-anotaciones-ver-gen.component';

describe('CursoAnotacionesVerGenComponent', () => {
  let component: CursoAnotacionesVerGenComponent;
  let fixture: ComponentFixture<CursoAnotacionesVerGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoAnotacionesVerGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoAnotacionesVerGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
