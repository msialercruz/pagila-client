import { Subject, map, tap } from 'rxjs'

export abstract class StateService<T> {
    protected lastState?: T

    protected state = new Subject<T>()

    state$ = this.state.asObservable().pipe(
        map((state) => ({ ...this.lastState, ...state })),
        tap((state) => (this.lastState = state))
    )

    update(newState: T) {
        this.state.next(newState)
    }
}
