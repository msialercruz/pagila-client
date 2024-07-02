import {
    Component,
    Input,
    OnChanges,
    Optional,
    SimpleChanges,
} from '@angular/core'
import { CommonModule } from '@angular/common'

export type ErrorCard = {
    header: string
    body: string
}

@Component({
    selector: 'error-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './error-card.component.html',
    styleUrl: './error-card.component.css',
})
export class ErrorCardComponent implements OnChanges {
    readonly CLOSED_TIMEOUT = 1 * 1000 // 1 minute

    @Input('card')
    @Optional()
    card?: ErrorCard

    closed = false

    ngOnChanges(changes: SimpleChanges) {
        if (changes.error.currentValue) {
            this.closed = false
        }
    }
}
