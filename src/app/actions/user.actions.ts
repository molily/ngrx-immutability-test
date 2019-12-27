import { createAction, props } from "@ngrx/store";
import { User } from "../interfaces/user";

export const setUser = createAction("[user] Set user", props<{ user: User }>());

export type UserAction = ReturnType<typeof setUser>;
