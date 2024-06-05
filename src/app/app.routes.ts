import { Routes } from '@angular/router'
import { FilmTableComponent } from './film/film-table/film-table.component'
import { pageFilmResolver } from './film/resolvers/page-film.resolver'
import { AddFilmFormComponent } from './films/add-film-form/add-film-form.component'
import { languageResolver } from './language/resolvers/language.resolver'

export const routes: Routes = [
    {
        path: 'films',
        component: FilmTableComponent,
        runGuardsAndResolvers: 'always',
        resolve: { pageFilm: pageFilmResolver },
    },
    {
        path: 'films/add',
        component: AddFilmFormComponent,
        resolve: { languages: languageResolver },
    },
    { path: '', redirectTo: '/films', pathMatch: 'full' },
]
