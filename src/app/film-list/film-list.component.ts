import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FilmService } from '../services/film.service'
import { HttpClientModule } from '@angular/common/http'
import { PaginationComponent } from '../pagination/pagination.component'
import {
    Observable,
    Subject,
    Subscription,
    debounceTime,
    distinctUntilChanged,
    map,
    tap,
} from 'rxjs'
import { ActivatedRoute, Data, Params, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { M2hPipe } from '../pipes/m2h.pipe'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'film-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PaginationComponent,
        M2hPipe,
        NgbTooltipModule,
    ],
    providers: [FilmService],
    templateUrl: './film-list.component.html',
    styleUrl: './film-list.component.css',
})
export class FilmListComponent implements OnInit {
    // pagination component
    currentPage = 1
    totalPages = 100
    currentPageSize = 10
    pageSizeOptions = [5, 10, 25, 50]
    totalElements = 100

    // resolver
    pageFilm$?: Observable<Data>

    // query input
    query$$?: Subscription
    currentQuery = ''
    delayedQuery = new Subject<string>()

    // url state
    urlQueryParams$$?: Subscription

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    updateQuery(event: Event) {
        const query = (event.target as HTMLInputElement).value
        this.delayedQuery.next(query)
    }

    ngOnInit() {
        this.query$$ = this.delayedQuery
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(() => {
                this.updateUrlQueryParams(
                    1,
                    this.currentQuery,
                    this.currentPageSize
                )
            })

        this.urlQueryParams$$ = this.route.queryParams.subscribe(
            (queryParams) => {
                let page = queryParams.page ?? 1
                let query = queryParams.query ?? ''
                let size = queryParams.size ?? 10
                if (isNaN(page)) {
                    return this.updateUrlQueryParams(1)
                }

                page = +page
                if (page < 1) {
                    return this.updateUrlQueryParams(1)
                }

                this.currentPage = page
                this.currentPageSize = +size
                this.currentQuery = query
            }
        )

        this.pageFilm$ = this.route.data.pipe(
            map(({ pageFilm }) => pageFilm),
            tap((pageFilm) => {
                this.totalPages = pageFilm.totalPages
                this.totalElements = pageFilm.totalElements
                if (this.currentPage > this.totalPages) {
                    this.updateUrlQueryParams(
                        this.totalPages,
                        this.currentQuery
                    )
                }
            })
        )
    }

    handleError() {}

    ngOnDestroy() {
        this.urlQueryParams$$?.unsubscribe()
        this.query$$?.unsubscribe()
    }

    updateUrlQueryParams(page: number, query?: string, size?: number) {
        const queryParams: Params = {}
        if (query && query !== '') {
            queryParams.query = query
        }
        if (page && page !== 1) {
            queryParams.page = page
        }
        if (size && size !== 10) {
            queryParams.size = size
        }

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
        })
    }
}
