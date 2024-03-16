import { ActivatedRoute, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'

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

    @Output('changePage')
    changePageEmitter: EventEmitter<number> = new EventEmitter<number>()

    pages: number[] = []

    hasPrevious: boolean = false

    hasNext: boolean = false

    wasLoaded: boolean = true

    queryParamsSub?: Subscription

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.pages = this.range(1, this.totalPages)
        this.queryParamsSub = this.route.queryParams.subscribe(
            (queryParams) => {
                let page = queryParams['page'] ?? 1
                if (isNaN(page)) {
                    return this.changePage(1)
                }

                page = Number(page)
                if (page < 1) {
                    return this.changePage(1)
                } else if (page > this.totalPages) {
                    return this.changePage(this.totalPages)
                }

                if (page == this.currentPage && !this.wasLoaded) {
                    this.wasLoaded = false
                    return
                }
                this.currentPage = Number(page)
                this.updateNextPrevious()
                this.changePageEmitter.emit(this.currentPage)
            }
        )
    }

    ngOnDestroy() {
        this.queryParamsSub?.unsubscribe()
    }

    range(start: number, end: number) {
        return [...new Array(end).keys()].map((p) => p + start)
    }

    changePage(page: number) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: page != 1 ? { page } : {},
        })
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
