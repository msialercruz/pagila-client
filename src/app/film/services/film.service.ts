import { Film } from '../models/film.model'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, map } from 'rxjs/operators'
import { PageFilm } from '../models/page-film.model'
import { throwError } from 'rxjs'
import { environment } from '../../../environments/environment'

interface FilmDTO {
    title: string
    release_year: number
    length: number
    rating: string
}

interface CreateFilmDTO {
    title: string
    description: string
    release_year: number
    language_id: number
    original_language_id: number
    rental_duration: number
    rental_rate: number
    length: number
    replacement_cost: number
    rating: string
    special_features: string[]
}

interface PageFilmDTO {
    total_pages: number
    total_elements: number
    films: FilmDTO[]
    page: number
}

export type ApiError = {
    title: string
    detail: string
    field?: string
}

export class ApiErrorList extends Error {
    constructor(
        public errors: ApiError[] = [],
        public status: number
    ) {
        super()
    }
}

@Injectable({
    providedIn: 'root',
})
export class FilmService {
    private readonly apiUrl = `${environment.apiUrl}/films`

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
                const films = data['films'].map((dto: FilmDTO) =>
                    this.filmDtoToFilm(dto)
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

    createFilm(film: Film) {
        const dto = this.filmToCreateFilmDTO(film)
        return this.http.post<any>(this.apiUrl, dto).pipe(
            map((dto: FilmDTO) => this.filmDtoToFilm(dto)),
            catchError((err: HttpErrorResponse) => {
                return throwError(() => {
                    const { errors } = err.error
                    return new ApiErrorList(errors, err.status)
                })
            })
        )
    }

    private filmToCreateFilmDTO(film: Film) {
        return {
            title: film.title!,
            description: film.description!,
            release_year: film.releaseYear!,
            language_id: film.languageId!,
            original_language_id: film.originalLanguageId!,
            rental_duration: film.rentalDuration!,
            rental_rate: film.rentalRate!,
            length: film.length!,
            replacement_cost: film.replacementCost!,
            rating: film.rating!,
            special_features: film.specialFeatures!,
        } as CreateFilmDTO
    }

    private filmDtoToFilm(dto: FilmDTO) {
        return {
            title: dto.title,
            releaseYear: dto.release_year,
            length: dto.length,
            rating: dto.rating,
        } as Film
    }
}
