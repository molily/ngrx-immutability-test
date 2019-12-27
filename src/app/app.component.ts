import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { AppState } from "./reducers";
import { UserState } from "./reducers/user.reducer";
import { selectUser } from "./selectors/user.selectors";
import { FormControl } from "@angular/forms";
import { User } from "./interfaces/user";
import { setUser } from "./actions/user.actions";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    public user$: Observable<User | null>;
    public userNameFormControl = new FormControl("");

    constructor(public store$: Store<AppState>) {
        this.user$ = store$.pipe(select(selectUser));
        this.user$.subscribe((user) => {
            if (user) {
                this.userNameFormControl.setValue(user.name);
            }
        });
    }

    public setInitialUser() {
        this.store$.dispatch(setUser({ user: { name: "Pingu" } }));
    }

    public setUserName() {
        this.store$.dispatch(setUser({ user: { name: this.userNameFormControl.value } }));
    }
}
