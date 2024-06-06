import { Component, EventEmitter, Output } from '@angular/core'

@Component({
    selector: 'film-special-features-list',
    templateUrl: './film-special-features-list.component.html',
    styleUrl: './film-special-features-list.component.css',
})
export class FilmSpecialFeaturesListComponent {
    @Output('featuresChanged')
    featuresChangedEmitter = new EventEmitter<Set<string>>()

    specialFeatures = new Set<string>()

    newFeature: string = ''

    addFeature() {
        if (this.newFeature && !this.specialFeatures.has(this.newFeature)) {
            this.specialFeatures.add(this.newFeature)
            this.featuresChangedEmitter.emit(this.specialFeatures)
            this.newFeature = ''
        }
    }

    constructor() {}

    removeFeature(feature: string) {
        this.specialFeatures.delete(feature)
        this.featuresChangedEmitter.emit(this.specialFeatures)
    }
}
