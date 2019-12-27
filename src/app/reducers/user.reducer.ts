import { Action, createReducer, on } from "@ngrx/store";

import { setUser } from "../actions/user.actions";
import { User } from "../interfaces/user";

export interface UserState {
    user: User | null;
}

export const initialState: UserState = {
    user: null,
};

const reducer = createReducer(
    initialState,
    on(setUser, (_state, action) => ({ user: action.user })),
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
    return reducer(state, action);
}
