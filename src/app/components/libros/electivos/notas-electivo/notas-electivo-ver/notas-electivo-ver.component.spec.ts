/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotasElectivoVerComponent } from './notas-electivo-ver.component';

describe('NotasElectivoVerComponent', () => {
  let component: NotasElectivoVerComponent;
  let fixture: ComponentFixture<NotasElectivoVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasElectivoVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasElectivoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
