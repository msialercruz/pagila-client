import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Film } from '../models/film.model'
import { FilmService } from '../services/film.service'
import { HttpClientModule } from '@angular/common/http'
import { PaginationComponent } from '../pagination/pagination.component'
import { Subscription } from 'rxjs'

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

    constructor(private filmService: FilmService) {}

    ngOnInit() {
        this.filmsSub = this.filmService.filmsSubj.subscribe((films) => {
            this.films = films
        })
    }

    ngOnDestroy() {
        this.filmsSub?.unsubscribe()
    }

    loadFilms(page: number) {
        this.filmService.getFilms(page)
    }
}
