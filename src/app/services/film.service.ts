import { BehaviorSubject } from 'rxjs'
import { Film } from '../models/film.model'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { PageFilm } from '../models/page-film.model'

interface FilmDTO {
    title: string
    release_year: number
    length: number
    rating: string
}

interface PageFilmDTO {
    total_pages: number
    films: FilmDTO[]
}

@Injectable({
    providedIn: 'root',
})
export class FilmService {
    private readonly apiUrl = 'http://localhost:8080/films'

    public pageFilmSubj = new BehaviorSubject<PageFilm>(new PageFilm(1, []))

    constructor(private http: HttpClient) {}

    getFilms(page?: number, query?: string) {
        let params = new HttpParams()
        if (page) {
            params = params.set('page', page)
        }
        if (query) {
            params = params.set('query', query)
        }
        const options = { params }

        this.http
            .get<any[]>(this.apiUrl, options)
            .pipe(
                map((data: PageFilmDTO | any) => {
                    const films = data['films'].map(
                        (f: FilmDTO) =>
                            new Film(
                                f['title'],
                                f['release_year'],
                                f['length'],
                                f['rating']
                            )
                    )
                    return new PageFilm(data['total_pages'], films)
                })
            )
            .subscribe({
                next: (pageFilm) => {
                    this.pageFilmSubj.next(pageFilm)
                },
                error: (err) => {
                    console.error(err)
                    this.pageFilmSubj.next(new PageFilm(0, []))
                },
            })
    }
}
