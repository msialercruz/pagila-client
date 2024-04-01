import { Injectable } from '@angular/core'
import { StateService } from '../../shared/state-service'
import { ActivatedRoute } from '@angular/router'
import { SortDirection } from '../../shared/components/sort-column/sort-column.component'
import { Sort } from '../../shared/directives/sorted-target.directive'

export type FilmTableState = {
    page?: number
    size?: number
    sort?: Sort
    query?: string
}

@Injectable({
    providedIn: 'root',
})
export class FilmTableService extends StateService<FilmTableState> {
    constructor(private route: ActivatedRoute) {
        super()
    }

    initWithQueryParams() {
        const initialState: FilmTableState = {}
        const { queryParams } = this.route.snapshot
        if (queryParams) {
            initialState.page = queryParams.page
            initialState.size = queryParams.size
            initialState.query = queryParams.query
            initialState.sort = parseSort(queryParams.sort)
            this.update(initialState)
        }
    }
}

// TODO: move this elsewhere
export function parseSort(sortText: string) {
    if (!sortText) {
        return new Sort()
    }
    const split = sortText.split(',')
    const sort = new Sort()
    sort.value = split[0]
    if (split.length === 2) {
        sort.direction = split[1] as SortDirection
    }
    return sort
}
