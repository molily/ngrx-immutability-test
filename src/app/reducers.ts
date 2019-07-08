import { MyState } from './myState';
import { ActionReducerMap } from '@ngrx/store';

const someDateReducer = () => undefined;

export const reducers: ActionReducerMap<MyState> = {
  someDate: someDateReducer
};
