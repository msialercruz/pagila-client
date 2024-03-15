import { Component, OnInit } from '@angular/core'
import { FilmService } from '../services/film.service'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { Film } from '../models/film.model'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-film-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    providers: [FilmService],
    templateUrl: './film-list.component.html',
    styleUrl: './film-list.component.css',
})
export class FilmListComponent implements OnInit {
    films: Film[] = []

    filmsSub?: Subscription

    constructor(private filmService: FilmService) {}

    ngOnInit() {
        this.filmsSub = this.filmService.filmsSubj.subscribe((films) => {
            this.films = films
        })
        this.filmService.getFilms()
    }

    ngOnDestroy() {
        this.filmsSub?.unsubscribe()
    }
}
