import { Component, OnInit } from '@angular/core'
import { FilmService } from '../services/film.service'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { Film } from '../models/film.model'
import { Subscription } from 'rxjs'
import { PaginationComponent } from '../pagination/pagination.component'
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

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private filmService: FilmService
    ) {}

    ngOnInit() {
        this.filmsSub = this.filmService.filmsSubj.subscribe((films) => {
            this.films = films
        })
        this.filmService.getFilms()
    }

    ngOnDestroy() {
        this.filmsSub?.unsubscribe()
    }

    // TODO: when accessing url from browser
    // - display correct page
    // - update pagination component (bidirectionnal)
    loadFilms(page: number) {
        this.filmService.getFilms(page)
        this.router.navigate(['.'], {
            relativeTo: this.route,
            queryParams: { page },
        })
    }
}
