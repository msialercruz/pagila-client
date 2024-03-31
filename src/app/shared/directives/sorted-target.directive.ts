import {
    Directive,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core'
import { Subject } from 'rxjs'
import {
    SortColumnComponent,
    SortDirection,
} from '../components/sort-column/sort-column.component'

// NOTE: inspired by
// https://github.com/angular/components/blob/d38798a474278c3d4b1533ae3ad7273786be9372/src/material/sort/sort.ts#L76
@Directive({
    selector: '[sortedTarget]',
    standalone: true,
})
export class SortedTargetDirective implements OnChanges {
    // emits to output method and to columns also
    @Output('sortChange')
    sortEmitter = new EventEmitter<Sort>()

    sortColumnsState = new Subject<Sort>()

    @Input('currentSort')
    currentSort?: Sort

    private sortColumns = new Map<string, SortColumnComponent>()

    ngOnChanges(changes: SimpleChanges) {
        if (changes.currentSort) {
            this.currentSort = changes.currentSort.currentValue ?? new Sort()
            if (!this.currentSort) {
                return
            }
            if (this.sortColumns.has(this.currentSort.value)) {
                const activeColumn = this.sortColumns.get(
                    this.currentSort.value
                )
                activeColumn!.direction = this.currentSort.direction
            }
            this.sortColumnsState.next(this.currentSort)
        }
    }

    applySort(sortColumn: SortColumnComponent) {
        if (sortColumn.value && this.sortColumns.has(sortColumn.value)) {
            sortColumn.direction = this.getNextDirection(sortColumn)
            this.currentSort = {
                value: sortColumn.value,
                direction: sortColumn.direction,
            }
            this.sortEmitter.next(this.currentSort ?? new Sort())
        }
    }

    register(sortColumn: SortColumnComponent) {
        if (sortColumn.value && !this.sortColumns.has(sortColumn.value)) {
            this.sortColumns.set(sortColumn.value, sortColumn)
            // apply initial sort
            if (
                this.currentSort &&
                sortColumn.value === this.currentSort.value
            ) {
                sortColumn.direction = this.currentSort.direction
                this.currentSort = this.currentSort
            }
        }
    }

    deregister(sortColumn: SortColumnComponent) {
        if (sortColumn.value && this.sortColumns.has(sortColumn.value)) {
            this.sortColumns.delete(sortColumn.value)
        }
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
