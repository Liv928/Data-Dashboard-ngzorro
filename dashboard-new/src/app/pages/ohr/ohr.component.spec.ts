/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OhrComponent } from './ohr.component';

describe('OhrComponent', () => {
  let component: OhrComponent;
  let fixture: ComponentFixture<OhrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
