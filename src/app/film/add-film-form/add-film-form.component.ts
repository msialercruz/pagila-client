import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Observable, map, tap } from 'rxjs'
import { Language } from '../../language/models/language.model'

@Component({
    selector: 'app-add-film-form',
    templateUrl: './add-film-form.component.html',
    styleUrl: './add-film-form.component.css',
})
export class AddFilmFormComponent implements OnInit {
    // constants
    ratings = ['G', 'PG', 'PG-13', 'NC-17']
    defaultRating = 'G'

    // observables
    languages$?: Observable<Language[]>

    // control getters
    get languageId() {
        return this.form.controls.languageId
    }

    get originalLanguageId() {
        return this.form.controls.originalLanguageId
    }

    get specialFeatures() {
        return this.form.controls.specialFeatures
    }

    // form group
    form = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        releaseYear: new FormControl(new Date().getFullYear()),
        languageId: new FormControl(),
        originalLanguageId: new FormControl(),
        rentalDuration: new FormControl(),
        rentalRate: new FormControl(),
        length: new FormControl(),
        replacementCost: new FormControl(),
        rating: new FormControl(this.defaultRating),
        specialFeatures: new FormArray([] as FormControl<string | null>[]),
    })

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.languages$ = this.route.data.pipe(
            map(({ languages }) => languages),
            tap((languages) => {
                this.languageId.setValue(languages[0].id)
                this.originalLanguageId.setValue(languages[0].id)
            })
        )
    }

    // NOTE: better to keep track of individual of operations like add/remove
    // from list instead?
    onFeaturesChanged(specialFeatures: Set<string>) {
        this.specialFeatures.clear()
        specialFeatures.forEach((f) =>
            this.specialFeatures.push(new FormControl(f))
        )
    }
}
