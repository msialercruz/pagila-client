import { Component } from '@angular/core'
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs'
import { FilmTableService } from '../film-table/film-table.service'
import { FilmSearchBarService } from './film-search-bar.service'

@Component({
    selector: 'film-search-bar',
    templateUrl: './film-search-bar.component.html',
    styleUrl: './film-search-bar.component.css',
})
export class FilmSearchBarComponent {
    querySub?: Subscription

    currentQuery = ''

    delayedQuery = new Subject<string>()

    stateSub: Subscription

    constructor(
        private searchService: FilmSearchBarService,
        private tableService: FilmTableService
    ) {
        this.querySub = this.delayedQuery
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((query) => {
                this.tableService.update({ page: 1, query })
            })
        this.stateSub = this.searchService.state$.subscribe((state) => {
            if (state.currentQuery) {
                this.currentQuery = state.currentQuery
            }
        })
    }

    ngOnDestroy() {
        this.querySub?.unsubscribe()
        this.stateSub?.unsubscribe()
    }

    updateQuery(event: Event) {
        const query = (event.target as HTMLInputElement).value
        this.delayedQuery.next(query)
    }
}
