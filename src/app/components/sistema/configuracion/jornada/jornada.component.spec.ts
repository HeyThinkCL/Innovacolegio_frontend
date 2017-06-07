/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JornadaComponent } from './jornada.component';

describe('JornadaComponent', () => {
  let component: JornadaComponent;
  let fixture: ComponentFixture<JornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
