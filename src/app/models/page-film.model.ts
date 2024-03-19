import { Film } from "./film.model";

export class PageFilm {
    constructor(
        public totalPages: number,
        public films: Film[]
    ) {}
}
