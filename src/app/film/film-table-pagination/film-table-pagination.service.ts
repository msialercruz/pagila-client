import { Injectable } from '@angular/core'
import { StateService } from '../../shared/state-service'

export type FilmTablePaginationState = {
    currentPage?: number
    currentPageSize?: number
    totalElements?: number
    totalPages?: number
}

@Injectable({
    providedIn: 'root',
})
export class FilmTablePaginationService extends StateService<FilmTablePaginationState> {
    getCurrentPage() {
        return this.lastState?.currentPage
    }

    getCurrentPageSize() {
        return this.lastState?.currentPageSize
    }
}
