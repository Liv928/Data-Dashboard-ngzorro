/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FnbComponent } from './fnb.component';

describe('FnbComponent', () => {
  let component: FnbComponent;
  let fixture: ComponentFixture<FnbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FnbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FnbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
