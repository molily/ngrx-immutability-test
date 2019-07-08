import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { deepFreeze } from './deep-freeze';
import { MyState } from './myState';
import { Test2Component } from './test2.component';

const date = new Date();
deepFreeze(date);

describe('Test2Component', () => {
  let fixture: ComponentFixture<Test2Component>;
  let component: Test2Component;

  const actionReducerMap: ActionReducerMap<MyState> = { someDate: () => date };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Test2Component],
      imports: [
        StoreModule.forRoot(actionReducerMap, {
          runtimeChecks: {
            strictStateSerializability: false,
            strictActionSerializability: false,
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('passes', () => {
    console.log('spec');
    expect().nothing();
  });
});
