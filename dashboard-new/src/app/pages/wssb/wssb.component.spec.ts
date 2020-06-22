/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WssbComponent } from './wssb.component';

describe('WssbComponent', () => {
  let component: WssbComponent;
  let fixture: ComponentFixture<WssbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WssbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WssbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
