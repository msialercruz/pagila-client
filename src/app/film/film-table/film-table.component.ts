import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription, map, tap } from 'rxjs'
import { ActivatedRoute, Data, Params, Router } from '@angular/router'
import { FilmTableService, parseSort } from './film-table.service'
import { FilmTablePaginationService } from '../film-table-pagination/film-table-pagination.service'
import { FilmSearchBarService } from '../film-search-bar/film-search-bar.service'
import { Sort } from '../../shared/directives/sorted-target.directive'

@Component({
    selector: 'film-table',
    templateUrl: './film-table.component.html',
    styleUrl: './film-table.component.css',
})
export class FilmTableComponent implements OnInit, OnDestroy {
    pageFilm$?: Observable<Data>

    currentSort?: Sort

    queryParamsSub?: Subscription

    stateSub?: Subscription

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private tableService: FilmTableService,
        private paginationService: FilmTablePaginationService,
        private searchService: FilmSearchBarService
    ) {
        this.stateSub = this.tableService.state$.subscribe((state) => {
            const { page, query, size, sort } = state
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
            if (sort && sort.direction !== '') {
                queryParams.sort = `${sort.value},${sort.direction}`
            }
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams,
            })
        })
    }

    ngOnInit() {
        this.tableService.initWithQueryParams()

        this.queryParamsSub = this.route.queryParams.subscribe(
            (queryParams) => {
                let page = queryParams.page ?? 1
                let query = queryParams.query ?? ''
                let size = queryParams.size ?? 10
                let sort = queryParams.sort ?? ''

                if (isNaN(page)) {
                    return this.tableService.update({ page: 1 })
                }

                page = +page
                if (page < 1) {
                    return this.tableService.update({ page: 1 })
                }
                size = +size

                this.currentSort = parseSort(sort)

                this.searchService.update({ currentQuery: query })

                this.paginationService.update({
                    currentPage: page,
                    currentPageSize: size,
                })
            }
        )

        this.pageFilm$ = this.route.data.pipe(
            map(({ pageFilm }) => pageFilm),
            tap((pageFilm) => {
                this.paginationService.update({
                    totalPages: pageFilm.totalPages,
                    totalElements: pageFilm.totalElements,
                })
                if (pageFilm.page > pageFilm.totalPages) {
                    this.tableService.update({
                        page: pageFilm.totalPages,
                    })
                }
            })
        )
    }

    ngOnDestroy() {
        this.queryParamsSub?.unsubscribe()
        this.stateSub?.unsubscribe()
    }

    handleSort(sort: Sort) {
        this.tableService.update({ sort })
    }
}
