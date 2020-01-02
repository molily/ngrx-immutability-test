/**
 * Returns whether an object can be frozen.
 */
function isFreezable(value: any): boolean {
    return (
        value !== undefined &&
        value !== null &&
        (typeof value === "object" || typeof value === "function")
    );
}

/**
 * Deeply freezes an object and its properties recursively.
 * @param value
 *
 * Usage example:
 *
 * const mutableObject = { user: { name: 'Minnie' } };
 * deepFreeze(mutableObject);
 * mutableObject.user = '123';      // Throwns an exception
 * mutableObject.user.name = '123'; // Throwns an exception
 */
export function deepFreeze<T extends { [key: string]: any }>(value: T): T {
    if (!isFreezable(value) || Object.isFrozen(value)) {
        return value;
    }

    Object.freeze(value);

    Object.getOwnPropertyNames(value).forEach((property) => {
        // Perform the same check as ngrx/store
        // See https://github.com/ngrx/platform/blob/master/modules/store/src/meta-reducers/immutability_reducer.ts
        if (
            typeof value === "function"
                ? property !== "caller" && property !== "callee" && property !== "arguments"
                : true
        ) {
            deepFreeze(value[property]);
        }
    });

    return value;
}

/**
 * Creates a reducer function that deep-freezes the state and action
 * before passing it to the given reducer. Use this in a reducer spec
 * to make sure the reducer is pure and does not mutate the state or action.
 * @param reducer Reducer function
 *
 * Usage in a spec:
 *
 * @import { myReducer } from './myReducer';
 *
 * const myFrozenReducer = deepFreezeReducer(myReducer);
 *
 * describe('myReducer', () => {
 *    it('handles an action', () => {
 *        expect(
 *            myFrozenReducer({}, someAction())
 *        ).toEqual({ it: 'works' });
 *    });
 * });
 */
export function deepFreezeReducer<StateArg, State extends StateArg, Action>(
    reducer: (state: StateArg, action: Action) => State,
): (state: StateArg, action: Action) => State {
    function deepFrozenReducer(state: StateArg, action: Action): State {
        return reducer(deepFreeze(state), deepFreeze(action));
    }
    return deepFrozenReducer;
}
