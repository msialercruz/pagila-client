import { CommonModule } from '@angular/common'
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnChanges {
    @Input('currentPage')
    currentPage!: number

    @Input('totalPages')
    totalPages!: number

    @Input('totalElements')
    totalElements!: number

    @Input('pageSizeOptions')
    pageSizeOptions!: number[]

    @Output('changeSize')
    changeSizeEmitter: EventEmitter<number> = new EventEmitter<number>()

    @Output('changePage')
    changePageEmitter: EventEmitter<number> = new EventEmitter<number>()

    numDisplayedPages = 11

    @Input('currentPageSize')
    currentPageSize = 10

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.currentPage && changes.currentPage.currentValue) {
            this.currentPage = changes.currentPage.currentValue
        }
        if (changes.totalPages && changes.totalPages.currentValue) {
            this.totalPages = changes.totalPages.currentValue
        }
        if (changes.currentPageSize && changes.currentPageSize.currentValue) {
            this.currentPageSize = changes.currentPageSize.currentValue
        }
        if (changes.totalElements && changes.totalElements.currentValue) {
            this.totalElements = changes.totalElements.currentValue
        }
    }

    get pageLastIndex() {
        return this.currentPage === this.totalPages
            ? this.totalElements
            : this.currentPage * this.currentPageSize
    }

    get pageFirstIndex() {
        return 1 + (this.currentPage - 1) * this.currentPageSize
    }

    get hasNext() {
        return this.currentPage < this.totalPages
    }

    get hasPrevious() {
        return this.currentPage > 1
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
