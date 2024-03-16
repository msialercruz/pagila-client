import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
    @Input('currentPage')
    currentPage: number = 1

    @Input('totalPages')
    totalPages: number = 10

    // TODO: make currentPage and totalPages bidirectionnal biding to change it
    // from other components

    @Output('changePage')
    changePageEmitter: EventEmitter<number> = new EventEmitter<number>()

    pages: number[] = []

    hasPrevious: boolean = false

    hasNext: boolean = true

    ngOnInit() {
        this.pages = this.range(1, this.totalPages)
    }

    private range(start: number, end: number) {
        return [...new Array(end).keys()].map((p) => p + start)
    }

    changePage(page: number) {
        if (page == this.currentPage) {
            return
        }
        this.currentPage = page
        this.checkNextAndPrevious()
        this.changePageEmitter.emit(this.currentPage)
    }

    private checkNextAndPrevious() {
        this.hasPrevious = this.currentPage > 1
        this.hasNext = this.currentPage < this.totalPages
    }

    next() {
        this.checkNextAndPrevious()
        const nextPage = this.hasNext ? this.currentPage + 1 : this.currentPage
        this.changePage(nextPage)
    }

    previous() {
        this.checkNextAndPrevious()
        const previousPage = this.hasPrevious
            ? this.currentPage - 1
            : this.currentPage
        this.changePage(previousPage)
    }
}
