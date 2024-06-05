import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Observable, map, tap } from 'rxjs'
import { Language } from '../../language/models/language.model'
import { numberWithPrecisionAndScale } from './add-film-form-validators'

@Component({
    selector: 'add-film-form',
    templateUrl: './add-film-form.component.html',
    styleUrl: './add-film-form.component.css',
})
export class AddFilmFormComponent implements OnInit {
    // constants
    ratings = ['G', 'PG', 'PG-13', 'NC-17']
    defaultRating = 'G'

    // observables
    languages$?: Observable<Language[]>

    // form controls getters
    get languageId() {
        return this.form.controls.languageId
    }

    get originalLanguageId() {
        return this.form.controls.originalLanguageId
    }

    get specialFeatures() {
        return this.form.controls.specialFeatures
    }

    form = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        releaseYear: [
            new Date().getFullYear(),
            Validators.compose([
                Validators.required,
                Validators.min(1901),
                Validators.max(2155),
            ]),
        ],
        languageId: [-1],
        originalLanguageId: [-1],
        rentalDuration: [
            3,
            Validators.compose([Validators.min(0), Validators.max(32767)]),
        ],
        rentalRate: [4.99, numberWithPrecisionAndScale(4, 2)],
        length: [
            0,
            Validators.compose([
                Validators.required,
                Validators.min(0),
                Validators.max(32767),
            ]),
        ],
        replacementCost: [19.99, numberWithPrecisionAndScale(5, 2)],
        rating: [this.defaultRating],
        specialFeatures: new FormArray<FormControl<string>>([]),
    })

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        console.log(this.form.controls.releaseYear)
        this.languages$ = this.route.data.pipe(
            map(({ languages }) => languages),
            tap((languages) => {
                this.languageId.setValue(languages[0].id!)
                this.originalLanguageId.setValue(languages[0].id!)
            })
        )
    }

    // NOTE: better to keep track of individual of operations like add/remove
    // from list instead?
    onFeaturesChanged(specialFeatures: Set<string>) {
        this.specialFeatures.clear()
        specialFeatures.forEach((f) =>
            this.specialFeatures.push(new FormControl(f, { nonNullable: true }))
        )
    }

    submitForm() {
        console.log(this.form.value)
    }
}
