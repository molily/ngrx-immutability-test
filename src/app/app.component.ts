import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { setUser } from "./actions/user.actions";
import { User } from "./interfaces/user";
import { AppState } from "./reducers";
import { selectUser } from "./selectors/user.selectors";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
    public user$: Observable<User | null>;
    public userForm: FormGroup;
    private userSubscription: Subscription;

    constructor(private formBuilder: FormBuilder, public store$: Store<AppState>) {
        this.userForm = this.formBuilder.group({
            name: ["", [Validators.required, Validators.maxLength(20)]],
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
        });
        this.user$ = store$.pipe(select(selectUser));
        this.userSubscription = this.user$.subscribe((user) => {
            if (user) {
                this.userForm.patchValue(user, { emitEvent: false });
            }
        });
    }

    public ngOnInit() {
        this.store$.dispatch(
            setUser({
                user: {
                    name: "minnie",
                    firstName: "Minnie",
                    lastName: "Mouse",
                    email: "minnie@disney.com",
                },
            }),
        );
    }

    public ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    public setUser() {
        if (this.userForm.valid) {
            this.store$.dispatch(setUser({ user: this.userForm.value }));
        }
    }
}
