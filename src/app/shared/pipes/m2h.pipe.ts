import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'm2h',
    standalone: true,
})
export class M2hPipe implements PipeTransform {
    transform(minutes: number) {
        const time = this.toTime(minutes)
        const minutesPart = String(time.minutes).padStart(2, '0')
        const hoursPart = String(time.hours).padStart(1, '0')
        return `${hoursPart}h ${minutesPart}m`
    }

    private toTime(totalMinutes: number) {
        const minutes = Math.floor(totalMinutes % 60)
        const hours = Math.floor(totalMinutes / 60)
        return { minutes, hours }
    }
}
