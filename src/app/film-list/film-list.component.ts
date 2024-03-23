import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Film } from '../models/film.model'
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
    querySub?: Subscription

    querySubj = new Subject<string>()

    currentQuery: string = ''

    films: Film[] = []

    currentPage: number = 1

    totalPages: number = 100

    queryParamSub?: Subscription

    pageFilm$?: Observable<Data>

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    updateQuerySubj(event: Event) {
        const query = (event.target as HTMLInputElement).value
        this.querySubj.next(query)
    }

    ngOnInit() {
        this.querySub = this.querySubj
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((query) => {
                this.updateQueryParams(1, query)
            })

        this.queryParamSub = this.route.queryParams.subscribe((queryParams) => {
            let page = queryParams.page ?? 1
            let query = queryParams.query ?? ''
            if (isNaN(page)) {
                return this.updateQueryParams(1)
            }

            page = +page
            if (page < 1) {
                return this.updateQueryParams(1)
            }
            this.currentPage = page
            this.currentQuery = query
        })

        this.pageFilm$ = this.route.data.pipe(
            map(({ pageFilm }) => pageFilm),
            tap((pageFilm) => {
                this.films = pageFilm.films
                this.totalPages = pageFilm.totalPages
                if (this.currentPage > this.totalPages) {
                    this.updateQueryParams(this.totalPages, this.currentQuery)
                }
            })
        )
    }

    ngOnDestroy() {
        this.queryParamSub?.unsubscribe()
        this.querySub?.unsubscribe()
    }

    updateQueryParams(page: number, query?: string) {
        const queryParams: Params = {}
        if (query && query !== '') {
            queryParams.query = query
        }
        if (page && page !== 1) {
            queryParams.page = page
        }

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
        })
    }
}
