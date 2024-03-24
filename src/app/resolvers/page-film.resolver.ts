import { ResolveFn } from '@angular/router'
import { FilmService } from '../services/film.service'
import { inject } from '@angular/core'
import { Observable } from 'rxjs'
import { PageFilm } from '../models/page-film.model'

export const pageFilmResolver: ResolveFn<Observable<PageFilm>> = (route) => {
    let page = route.queryParams.page ?? 1
    let query = route.queryParams.query ?? ''
    let size = route.queryParams.size ?? 10

    const filmService = inject(FilmService)
    if (isNaN(page) || +page < 1) {
        page = 1
    }

    return filmService.getFilms(+page, query, +size)
}
