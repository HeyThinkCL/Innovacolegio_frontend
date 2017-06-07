/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ElectivosComponent } from './electivos.component';

describe('ElectivosComponent', () => {
  let component: ElectivosComponent;
  let fixture: ComponentFixture<ElectivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
