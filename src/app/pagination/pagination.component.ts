import { CommonModule } from '@angular/common'
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core'

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit, OnChanges {
    @Input('currentPage')
    currentPage = 1

    @Input('totalPages')
    totalPages = 10

    @Output('changePage')
    changePageEmitter: EventEmitter<number> = new EventEmitter<number>()

    pages: number[] = []

    numDisplayedPages = 11

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.currentPage && changes.currentPage.currentValue) {
            this.currentPage = changes.currentPage.currentValue
        }
        if (changes.totalPages && changes.totalPages.currentValue) {
            this.totalPages = changes.totalPages.currentValue
        }
    }

    get displayedPages() {
        if (this.totalPages <= this.numDisplayedPages) {
            return this.range(1, this.totalPages)
        } else if (this.currentPage >= 1 && this.currentPage <= 6) {
            return this.range(1, 11)
        } else if (
            this.currentPage > 6 &&
            this.currentPage <= this.totalPages - 6
        ) {
            return this.range(this.currentPage - 5, this.currentPage + 5)
        } else {
            return this.range(this.totalPages - 10, this.totalPages)
        }
    }

    get hasNext() {
        return this.currentPage < this.totalPages
    }

    get hasPrevious() {
        return this.currentPage > 1
    }

    ngOnInit() {}

    range(start: number, end: number): number[] {
        return [...new Array(end - start + 1).keys()].map((p) => p + start)
    }

    changePage(page: number) {
        if (page === this.currentPage) {
            return
        }
        this.currentPage = page
        this.changePageEmitter.emit(this.currentPage)
    }

    next() {
        const nextPage = this.hasNext ? this.currentPage + 1 : this.currentPage
        this.changePage(nextPage)
    }

    previous() {
        const previousPage = this.hasPrevious
            ? this.currentPage - 1
            : this.currentPage
        this.changePage(previousPage)
    }
}
