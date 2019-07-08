import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { deepFreeze } from './deep-freeze';
import { MyState } from './myState';
import { Test1Component } from './test1.component';

const date = new Date();

const state: MyState = {
  someDate: date
};
deepFreeze(state);

describe('Test1Component', () => {
  let fixture: ComponentFixture<Test1Component>;
  let component: Test1Component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Test1Component],
      providers: [provideMockStore({ initialState: state })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('passes', () => {
    console.log('spec');
    expect().nothing();
  });
});
