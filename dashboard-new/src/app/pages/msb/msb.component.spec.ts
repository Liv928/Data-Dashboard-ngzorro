/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MsbComponent } from './msb.component';

describe('MsbComponent', () => {
  let component: MsbComponent;
  let fixture: ComponentFixture<MsbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
