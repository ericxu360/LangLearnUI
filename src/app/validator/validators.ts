import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function createEqualsValidator(one: AbstractControl, two: AbstractControl): ValidatorFn {
  return (): ValidationErrors | null => {
    if (one.value !== two.value) {
      return {notEqual: true}
    }
    return null;
  };
}
