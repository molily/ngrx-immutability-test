import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from "../reducers";
import { UserState } from "../reducers/user.reducer";

export const selectUserState = createFeatureSelector<AppState, UserState>("user");

export const selectUser = createSelector(
    selectUserState,
    (userState) => userState.user,
);
