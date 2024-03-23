import { Routes } from '@angular/router'
import { FilmListComponent } from './film-list/film-list.component'
import { pageFilmResolver } from './resolvers/page-film.resolver'

export const routes: Routes = [
    {
        path: 'films',
        component: FilmListComponent,
        runGuardsAndResolvers: 'always',
        resolve: { pageFilm: pageFilmResolver },
    },
    { path: '', redirectTo: '/films', pathMatch: 'full' },
]
