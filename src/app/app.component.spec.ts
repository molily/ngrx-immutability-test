import { Spectator, createComponentFactory, byTestId } from "@ngneat/spectator";
import { async, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideMockStore, MockStore } from "@ngrx/store/testing";

import { AppComponent } from "./app.component";
import { User } from "./interfaces/user";
import { AppState } from "./reducers";
import { deepFreeze } from "./spec-helpers/deep-freeze.spec-helper";
import { Store } from "@ngrx/store";
import { setUser } from "./actions/user.actions";

const mockUser: User = {
    name: "minnie.mouse",
    firstName: "Minnie",
    lastName: "Mouse",
    email: "minnie.mouse@example.org",
};
const mockState: AppState = {
    user: { user: mockUser },
};
deepFreeze(mockState);

describe("AppComponent", () => {
    let spectator: Spectator<AppComponent>;
    let store$: MockStore<AppState>;

    const createComponent = createComponentFactory({
        component: AppComponent,
        shallow: true,
        imports: [FormsModule, ReactiveFormsModule],
        providers: [provideMockStore({ initialState: mockState })],
    });

    const render = () => {
        spectator = createComponent();
        store$ = TestBed.get(Store);
        spyOn(store$, "dispatch");
    };

    it("dispatches a setUser action on init", fakeAsync(() => {
        render();
        tick(1000);
        expect(store$.dispatch).toHaveBeenCalledWith(setUser({ user: mockUser }));
    }));

    describe("reactive form", () => {
        it("fills out the user form", () => {
            render();
            expect(spectator.query(byTestId("reactive-form-name"))).toHaveValue(mockUser.name);
            expect(spectator.query(byTestId("reactive-form-first-name"))).toHaveValue(
                mockUser.firstName,
            );
            expect(spectator.query(byTestId("reactive-form-last-name"))).toHaveValue(
                mockUser.lastName,
            );
            expect(spectator.query(byTestId("reactive-form-email"))).toHaveValue(mockUser.email);
        });
    });

    describe("template-driven form", () => {
        it("fills out the user form", async () => {
            render();
            await spectator.fixture.whenStable();

            expect(spectator.query(byTestId("template-driven-form-name"))).toHaveValue(
                mockUser.name,
            );
            expect(spectator.query(byTestId("template-driven-form-first-name"))).toHaveValue(
                mockUser.firstName,
            );
            expect(spectator.query(byTestId("template-driven-form-last-name"))).toHaveValue(
                mockUser.lastName,
            );
            expect(spectator.query(byTestId("template-driven-form-email"))).toHaveValue(
                mockUser.email,
            );
        });
    });
});
