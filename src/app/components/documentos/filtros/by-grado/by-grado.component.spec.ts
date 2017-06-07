/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ByGradoComponent } from './by-grado.component';

describe('ByGradoComponent', () => {
  let component: ByGradoComponent;
  let fixture: ComponentFixture<ByGradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByGradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByGradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
