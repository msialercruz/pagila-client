import { TestBed } from '@angular/core/testing'
import { ResolveFn } from '@angular/router'
import { pageFilmResolver } from './page-film.resolver'
import { PageFilm } from '../models/page-film.model'
import { Observable } from 'rxjs'

describe('pageFilmResolver', () => {
    const executeResolver: ResolveFn<Observable<PageFilm>> = (
        ...resolverParameters
    ) =>
        TestBed.runInInjectionContext(() =>
            pageFilmResolver(...resolverParameters)
        )

    beforeEach(() => {
        TestBed.configureTestingModule({})
    })

    it('should be created', () => {
        expect(executeResolver).toBeTruthy()
    })
})
