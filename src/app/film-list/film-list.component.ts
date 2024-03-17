import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Film } from '../models/film.model'
import { FilmService } from '../services/film.service'
import { HttpClientModule } from '@angular/common/http'
import { PaginationComponent } from '../pagination/pagination.component'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-film-list',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule, PaginationComponent],
    providers: [FilmService],
    templateUrl: './film-list.component.html',
    styleUrl: './film-list.component.css',
})
export class FilmListComponent implements OnInit {
    currentQuery: string = ''

    films: Film[] = []

    currentPage: number = 1

    totalPages: number = 20

    filmsSub?: Subscription

    queryParamSub?: Subscription

    constructor(
        private filmService: FilmService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // read from query params in URL
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
            // NOTE: making this comparison at start will always be
            // incorrect, it will always be equal to 20! (init value)
            // maybe handle this after getting films? (in
            // filmsSubj.subscribe(...))
            else if (page > this.totalPages) {
                return this.updateQueryParams(this.totalPages)
            }

            this.currentPage = page
            this.currentQuery = query
            this.filmService.getFilms(page, query)
        })

        this.filmsSub = this.filmService.filmsSubj.subscribe((films) => {
            this.films = films

            // TODO: remove this when totalPages returned from api is
            // implemented
            if (this.currentQuery !== '') {
                this.totalPages = 3
            } else {
                this.totalPages = 20
            }

            // TODO: update this.totalPages with value returned from api when
            // implemented
        })
    }

    ngOnDestroy() {
        this.queryParamSub?.unsubscribe()
        this.filmsSub?.unsubscribe()
    }

    updateQueryParams(page: number, query?: string) {
        const queryParams: Params = {}
        if (query && query !== '') {
            queryParams.query = query
        }
        if (page && page !== 1) {
            queryParams.page = page
        }
        console.log(queryParams)

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams,
        })
    }
}
