import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, finalize, map, tap } from 'rxjs'
import { Language } from '../../language/models/language.model'
import { ApiErrorList, FilmService } from '../services/film.service'
import { Film } from '../models/film.model'
import { snakeToCamel } from '../../../utils'
import {
    numberWithPrecisionAndScale,
    positiveInt16,
} from '../../shared/validators'
import { ErrorCard } from '../../shared/components/error-card/error-card.component'

@Component({
    selector: 'add-film-form',
    templateUrl: './add-film-form.component.html',
    styleUrl: './add-film-form.component.css',
})
export class AddFilmFormComponent implements OnInit {
    submitted = false

    card?: ErrorCard

    ratings = ['G', 'PG', 'PG-13', 'NC-17']

    defaultRating = 'G'

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
        rentalDuration: [3, positiveInt16()],
        rentalRate: [4.99, numberWithPrecisionAndScale(4, 2)],
        length: [0, Validators.compose([Validators.required, positiveInt16()])],
        replacementCost: [19.99, numberWithPrecisionAndScale(5, 2)],
        rating: [this.defaultRating],
        specialFeatures: new FormArray<FormControl<string>>([]),
    })

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private filmService: FilmService
    ) {}

    ngOnInit() {
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
        if (!this.form.valid) {
            return
        }

        this.submitted = true
        this.card = undefined
        this.form.disable()
        this.filmService
            .createFilm(this.form.value as Film)
            .pipe(
                finalize(() => {
                    this.submitted = false
                    this.form.enable()
                })
            )
            .subscribe({
                next: () => {
                    this.router.navigate(['/films'])
                },
                error: (err: ApiErrorList) => {
                    if (err.status === 400) {
                        for (const e of err.errors) {
                            const controlName = snakeToCamel(e.field!)
                            if (this.form.get(controlName)) {
                                this.form
                                    .get(controlName)
                                    ?.setErrors({ serverError: e.detail })
                            }
                        }
                    } else {
                        const first = err.errors[0]
                        this.card = {
                            header: first.title,
                            body: first.detail,
                        }
                    }
                },
            })
    }
}
