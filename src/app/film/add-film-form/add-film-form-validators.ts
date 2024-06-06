import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

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
