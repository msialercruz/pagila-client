import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms'

export function numberWithPrecisionAndScale(
    precision: number,
    scale: number
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const parts = control.value.toString().split('.')
        const digitsBeforeComma = parts[0].length
        const digitsAfterComma = parts[1].length
        const maxBeforeComma = precision - scale
        const maxAfterComma = scale
        return digitsBeforeComma > maxBeforeComma ||
            digitsAfterComma > maxAfterComma
            ? {
                  numberWithPrecisionAndScale: {
                      precision,
                      scale,
                      digitsBeforeComma,
                      digitsAfterComma,
                  },
              }
            : null
    }
}

export const positiveInt16 = () =>
    Validators.compose([Validators.min(0), Validators.max(32767)])
