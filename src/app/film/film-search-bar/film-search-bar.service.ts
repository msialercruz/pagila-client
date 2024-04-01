import { Injectable } from '@angular/core'
import { StateService } from '../../shared/state-service'

type FilmSearchBarState = {
    currentQuery?: string
}

@Injectable({
    providedIn: 'root',
})
export class FilmSearchBarService extends StateService<FilmSearchBarState> {}
