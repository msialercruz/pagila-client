import { Directive, EventEmitter, Input, Output } from '@angular/core'
import {
    SortColumnComponent,
    SortDirection,
} from '../sort-column/sort-column.component'

// NOTE: inspired by
// https://github.com/angular/components/blob/d38798a474278c3d4b1533ae3ad7273786be9372/src/material/sort/sort.ts#L76
@Directive({
    selector: '[sortedTarget]',
    standalone: true,
})
export class SortedTargetDirective {
    // emits to output method and to columns also
    @Output('sortChange')
    sortEmitter: EventEmitter<Sort> = new EventEmitter<Sort>()

    @Input('initialSort')
    initialSort?: Sort

    currentSort?: Sort

    private sortColumns: Map<string, SortColumnComponent> = new Map<
        string,
        SortColumnComponent
    >()

    applySort(sortable: SortColumnComponent) {
        if (sortable.value && this.sortColumns.has(sortable.value)) {
            sortable.direction = this.getNextDirection(sortable)
            this.currentSort = {
                value: sortable.value,
                direction: sortable.direction,
            }
            this.sortEmitter.next(this.currentSort)
        }
    }

    register(sortColumn: SortColumnComponent) {
        if (sortColumn.value && !this.sortColumns.has(sortColumn.value)) {
            this.sortColumns.set(sortColumn.value, sortColumn)
            // apply initial sort
            if (
                this.initialSort &&
                sortColumn.value === this.initialSort.value
            ) {
                sortColumn.direction = this.initialSort.direction
                this.currentSort = this.initialSort
            }
        }
    }

    deregister(sortColumn: SortColumnComponent) {
        if (sortColumn.value && this.sortColumns.has(sortColumn.value)) {
            this.sortColumns.delete(sortColumn.value)
        }
    }

    reset() {
        this.sortEmitter.next(new Sort())
    }

    private getNextDirection(sortColumn: SortColumnComponent) {
        switch (sortColumn.direction) {
            case SortDirection.NONE:
                return SortDirection.ASC
            case SortDirection.ASC:
                return SortDirection.DESC
            case SortDirection.DESC:
                return SortDirection.NONE
        }
    }
}

export class Sort {
    value: string = ''
    direction: SortDirection = SortDirection.NONE
}
