import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Observable, map, tap } from 'rxjs'
import { Language } from '../../language/models/language.model'

@Component({
    selector: 'app-add-film-form',
    templateUrl: './add-film-form.component.html',
    styleUrl: './add-film-form.component.css',
})
export class AddFilmFormComponent implements OnInit {
    ratings = ['G', 'PG', 'PG-13', 'NC-17']

    defaultRating = 'G'

    languages$?: Observable<Language[]>

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
        specialFeatures: new FormControl(),
    })

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.languages$ = this.route.data.pipe(
            map(({ languages }) => languages),
            tap((languages) => {
                this.form.controls.languageId.setValue(languages[0].id)
                this.form.controls.originalLanguageId.setValue(languages[0].id)
            })
        )
    }
}
