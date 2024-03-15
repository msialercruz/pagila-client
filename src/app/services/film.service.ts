import { BehaviorSubject } from 'rxjs'
import { Film } from '../models/film.model'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class FilmService {
    private readonly apiUrl = 'http://localhost:8080/films'

    public filmsSubj = new BehaviorSubject<Film[]>([])

    constructor(private client: HttpClient) {}

    getFilms(page?: number) {
        const options = page
            ? { params: new HttpParams().set('page', page) }
            : {}
        this.client
            .get<any[]>(this.apiUrl, options)
            .pipe(
                map((data) =>
                    data.map(
                        (e) =>
                            new Film(
                                e['title'],
                                e['release_year'],
                                e['length'],
                                e['rating']
                            )
                    )
                )
            )
            .subscribe({
                next: (films) => {
                    this.filmsSubj.next(films)
                },
                error: (err) => {
                    console.error(err)
                    this.filmsSubj.next([])
                },
            })
    }
}
