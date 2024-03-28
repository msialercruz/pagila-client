import { CommonModule } from '@angular/common'
import {
    Component,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
} from '@angular/core'
import { SortedTargetDirective } from '../directives/sorted-target.directive'
import { merge } from 'rxjs'

// NOTE: inspired by https://github.com/angular/components/blob/d38798a474278c3d4b1533ae3ad7273786be9372/src/material/sort/sort-header.ts#L73
@Component({
    selector: '[sortColumn]',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sort-column.component.html',
    styleUrl: './sort-column.component.css',
})
export class SortColumnComponent implements OnInit, OnDestroy {
    @Input('sortColumn')
    value?: string

    direction: SortDirection = SortDirection.NONE

    constructor(@Optional() public sortedTarget: SortedTargetDirective) {}

    ngOnDestroy(): void {
        this.sortedTarget.deregister(this)
    }

    ngOnInit() {
        this.sortedTarget.register(this)
        merge(
            this.sortedTarget.sortEmitter,
            this.sortedTarget.sortColumnsState
        ).subscribe((sort) => {
            if (!sort || this.value !== sort.value) {
                this.direction = SortDirection.NONE
            }
        })
    }

    get isDesc() {
        return this.direction === SortDirection.DESC
    }

    get isAsc() {
        return this.direction === SortDirection.ASC
    }

    @HostListener('click')
    onClick() {
        this.sortedTarget.applySort(this)
    }
}

export enum SortDirection {
    NONE = '',
    ASC = 'asc',
    DESC = 'desc',
}
