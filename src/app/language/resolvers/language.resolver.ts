import { ResolveFn } from '@angular/router'
import { Language } from '../models/language.model'
import { Observable } from 'rxjs'
import { LanguageService } from '../services/language.service'
import { inject } from '@angular/core'

export const languageResolver: ResolveFn<Observable<Language[]>> = (
    route,
    state
) => {
    const languageService = inject(LanguageService)
    return languageService.getLanguages()
}
