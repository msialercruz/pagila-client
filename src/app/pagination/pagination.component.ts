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
    currentPage: number = 1

    @Input('totalPages')
    totalPages: number = 10

    @Output('changePage')
    changePageEmitter: EventEmitter<number> = new EventEmitter<number>()

    pages: number[] = []

    hasPrevious: boolean = false

    hasNext: boolean = false

    wasLoaded: boolean = true

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.currentPage && changes.currentPage.currentValue) {
            this.currentPage = changes.currentPage.currentValue
        }
        if (changes.totalPages && changes.totalPages.currentValue) {
            this.totalPages = changes.totalPages.currentValue
        }
        this.updateNextPrevious()
    }

    ngOnInit() {
        this.pages = this.range(1, this.totalPages)
    }

    range(start: number, end: number): number[] {
        return [...new Array(end).keys()].map((p) => p + start)
    }

    changePage(page: number) {
        if (page === this.currentPage) {
            return
        }
        this.currentPage = page
        this.updateNextPrevious()
        this.changePageEmitter.emit(this.currentPage)
    }

    private updateNextPrevious() {
        this.hasPrevious = this.currentPage > 1
        this.hasNext = this.currentPage < this.totalPages
    }

    next() {
        this.updateNextPrevious()
        const nextPage = this.hasNext ? this.currentPage + 1 : this.currentPage
        this.changePage(nextPage)
    }

    previous() {
        this.updateNextPrevious()
        const previousPage = this.hasPrevious
            ? this.currentPage - 1
            : this.currentPage
        this.changePage(previousPage)
    }
}
