import { Routes } from '@angular/router'
import { FilmTableComponent } from './film/film-table/film-table.component'
import { pageFilmResolver } from './film/resolvers/page-film.resolver'

export const routes: Routes = [
    {
        path: 'films',
        component: FilmTableComponent,
        runGuardsAndResolvers: 'always',
        resolve: { pageFilm: pageFilmResolver },
    },
    { path: '', redirectTo: '/films', pathMatch: 'full' },
]
