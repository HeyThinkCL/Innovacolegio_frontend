/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CierreAnnoComponent } from './cierre-anno.component';

describe('CierreAnnoComponent', () => {
  let component: CierreAnnoComponent;
  let fixture: ComponentFixture<CierreAnnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierreAnnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreAnnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
