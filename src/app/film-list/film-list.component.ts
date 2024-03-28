import { CommonModule } from '@angular/common'
import { Component, OnInit, ViewChild } from '@angular/core'
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
import {
    Sort,
    SortedTargetDirective,
} from '../directives/sorted-target.directive'
import {
    SortColumnComponent,
    SortDirection,
} from '../sort-column/sort-column.component'

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
        SortedTargetDirective,
        SortColumnComponent,
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

    @ViewChild('sortedTarget', { read: SortedTargetDirective })
    sortedTarget?: SortedTargetDirective

    // resolver
    pageFilm$?: Observable<Data>

    // query input
    query$$?: Subscription
    currentQuery = ''
    delayedQuery = new Subject<string>()

    // sort header
    currentSort?: Sort

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

    // TODO: move this elsewhere
    parseSortText(sortText: string) {
        if (!sortText) {
            return new Sort()
        }
        const split = sortText.split(',')
        const sort = new Sort()
        sort.value = split[0]
        if (split.length === 2) {
            sort.direction = split[1] as SortDirection
        }
        return sort
    }

    ngOnInit() {
        this.query$$ = this.delayedQuery
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(() => {
                this.updateUrlQueryParams(
                    1,
                    this.currentQuery,
                    this.currentPageSize,
                    this.currentSort
                )
            })

        this.urlQueryParams$$ = this.route.queryParams.subscribe(
            (queryParams) => {
                let page = queryParams.page ?? 1
                let query = queryParams.query ?? ''
                let size = queryParams.size ?? 10
                let sort = queryParams.sort ?? ''

                if (isNaN(page)) {
                    return this.updateUrlQueryParams(1)
                }

                page = +page
                if (page < 1) {
                    return this.updateUrlQueryParams(1)
                }

                this.currentSort = this.parseSortText(sort)
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

    ngOnDestroy() {
        this.urlQueryParams$$?.unsubscribe()
        this.query$$?.unsubscribe()
    }

    updateUrlQueryParams(
        page: number,
        query?: string,
        size?: number,
        sort?: Sort
    ) {
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
        if (sort) {
            queryParams.sort =
                sort.direction === SortDirection.NONE
                    ? ''
                    : `${sort.value},${sort.direction}`
        }

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
        })
    }

    handleSort(sort: Sort) {
        this.updateUrlQueryParams(
            this.currentPage,
            this.currentQuery,
            this.currentPageSize,
            sort
        )
    }
}
