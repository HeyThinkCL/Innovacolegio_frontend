/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotasElectivoIngresarComponent } from './notas-electivo-ingresar.component';

describe('NotasElectivoIngresarComponent', () => {
  let component: NotasElectivoIngresarComponent;
  let fixture: ComponentFixture<NotasElectivoIngresarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasElectivoIngresarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasElectivoIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
