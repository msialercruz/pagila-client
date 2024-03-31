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
    total_elements: number
    films: FilmDTO[]
    page: number
}

@Injectable({
    providedIn: 'root',
})
export class FilmService {
    private readonly apiUrl = 'http://localhost:8080/films'

    public pageFilmSubj = new BehaviorSubject<PageFilm>(new PageFilm())

    constructor(private http: HttpClient) {}

    getFilms(page?: number, query?: string, size?: number, sort?: string) {
        let params = new HttpParams()
        if (page) {
            params = params.set('page', page)
        }
        if (query) {
            params = params.set('query', query)
        }
        if (size) {
            params = params.set('size', size)
        }
        if (sort) {
            params = params.set('sort', sort)
        }
        const options = { params }
        return this.http.get<any[]>(this.apiUrl, options).pipe(
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
                return new PageFilm(
                    data['total_pages'],
                    data['total_elements'],
                    films,
                    page
                )
            })
        )
    }
}
