import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FilmTablePaginationComponent } from './film-table-pagination/film-table-pagination.component'
import { FormsModule } from '@angular/forms'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { FilmTableComponent } from './film-table/film-table.component'
import { FilmSearchBarComponent } from './film-search-bar/film-search-bar.component'
import { PaginationComponent } from '../shared/components/pagination/pagination.component'
import { M2hPipe } from '../shared/pipes/m2h.pipe'
import { SortedTargetDirective } from '../shared/directives/sorted-target.directive'
import { SortColumnComponent } from '../shared/components/sort-column/sort-column.component'
import { FilmService } from './services/film.service'
import { FilmTablePaginationService } from './film-table-pagination/film-table-pagination.service'
import { FilmSearchBarService } from './film-search-bar/film-search-bar.service'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        PaginationComponent,
        M2hPipe,
        NgbTooltipModule,
        SortedTargetDirective,
        SortColumnComponent,
    ],
    providers: [FilmService, FilmSearchBarService, FilmTablePaginationService],
    declarations: [
        FilmSearchBarComponent,
        FilmTableComponent,
        FilmTablePaginationComponent,
    ],
    exports: [FilmTableComponent],
})
export class FilmModule {}
