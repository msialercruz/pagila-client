import { Film } from './film.model'

export class PageFilm {
    constructor(
        public totalPages: number = 0,
        public totalElements: number = 0,
        public films: Film[] = []
    ) {}
}
