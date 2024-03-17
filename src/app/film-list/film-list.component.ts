import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Film } from '../models/film.model'
import { FilmService } from '../services/film.service'
import { HttpClientModule } from '@angular/common/http'
import { PaginationComponent } from '../pagination/pagination.component'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-film-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule, PaginationComponent],
    providers: [FilmService],
    templateUrl: './film-list.component.html',
    styleUrl: './film-list.component.css',
})
export class FilmListComponent implements OnInit {
    films: Film[] = []

    currentPage: number = 1

    // TODO: update this with value returned from api when implemented
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
            if (isNaN(page)) {
                return this.updatePage(1)
            }

            page = +page
            if (page < 1) {
                return this.updatePage(1)
            } else if (page > this.totalPages) {
                return this.updatePage(this.totalPages)
            }

            this.currentPage = page
            this.filmService.getFilms(page)
        })

        this.filmsSub = this.filmService.filmsSubj.subscribe((films) => {
            this.films = films
        })
    }

    ngOnDestroy() {
        this.queryParamSub?.unsubscribe()
        this.filmsSub?.unsubscribe()
    }

    // TODO: this should be the method that updates queryParams
    updatePage(page: number) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page },
        })
    }
}
