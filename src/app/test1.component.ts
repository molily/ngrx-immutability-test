import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MyState } from './myState';

@Component({
    selector: 'app-test1',
    template: '{{ date$ | async }}'
})
export class Test1Component {
    public date$: Observable<Date>;

    public constructor(private store: Store<MyState>) {
        this.date$ = this.store.pipe(select((state) => state.someDate));
    }
}
