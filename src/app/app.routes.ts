import { Routes } from '@angular/router'
import { FilmListComponent } from './film-list/film-list.component'

export const routes: Routes = [
    { path: 'films', component: FilmListComponent },
    { path: '', redirectTo: '/films', pathMatch: 'full' },
]
