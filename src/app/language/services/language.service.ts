import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs'
import { Language } from '../models/language.model'

type LanguageDTO = {
    language_id: number
    name: string
}

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    private readonly apiUrl = 'http://localhost:8080/languages'

    constructor(private http: HttpClient) {}

    getLanguages() {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map((data: LanguageDTO[]) => {
                return data.map(
                    (l: LanguageDTO) => new Language(l.language_id, l.name)
                )
            })
        )
    }
}
