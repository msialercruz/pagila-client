import { Component, OnDestroy } from '@angular/core'
import { FilmTableService } from '../film-table/film-table.service'
import { FilmTablePaginationService } from './film-table-pagination.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'film-table-pagination',
    templateUrl: './film-table-pagination.component.html',
    styleUrl: './film-table-pagination.component.css',
})
export class FilmTablePaginationComponent implements OnDestroy {
    currentPage = 1

    totalPages = 10

    currentPageSize = 10

    pageSizeOptions = [5, 10, 25, 50]

    totalElements = 100

    stateSub?: Subscription

    constructor(
        private tableService: FilmTableService,
        private paginationService: FilmTablePaginationService
    ) {
        this.stateSub = this.paginationService.state$.subscribe((state) => {
            if (state.currentPage) {
                this.currentPage = state.currentPage
            }
            if (state.currentPageSize) {
                this.currentPageSize = state.currentPageSize
            }
            if (state.totalPages) {
                this.totalPages = state.totalPages
            }
            if (state.totalElements) {
                this.totalElements = state.totalElements
            }
        })
    }

    ngOnDestroy() {
        this.stateSub?.unsubscribe()
    }

    updatePageNumber(page: number) {
        this.tableService.update({ page })
    }

    updatePageSize(size: number) {
        this.tableService.update({ page: 1, size })
    }
}
