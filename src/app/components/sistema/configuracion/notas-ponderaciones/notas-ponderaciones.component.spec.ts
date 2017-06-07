/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotasPonderacionesComponent } from './notas-ponderaciones.component';

describe('NotasPonderacionesComponent', () => {
  let component: NotasPonderacionesComponent;
  let fixture: ComponentFixture<NotasPonderacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasPonderacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasPonderacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
