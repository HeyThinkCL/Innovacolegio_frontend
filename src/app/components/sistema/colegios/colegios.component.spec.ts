/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ColegiosComponent } from './colegios.component';

describe('ColegiosComponent', () => {
  let component: ColegiosComponent;
  let fixture: ComponentFixture<ColegiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColegiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColegiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
