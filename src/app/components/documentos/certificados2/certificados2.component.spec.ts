import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Certificados2Component } from './certificados2.component';

describe('Certificados2Component', () => {
  let component: Certificados2Component;
  let fixture: ComponentFixture<Certificados2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Certificados2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Certificados2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
