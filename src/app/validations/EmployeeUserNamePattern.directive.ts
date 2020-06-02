import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmployeeUsernamePattern]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmployeeUsernamePatternDirective, multi: true}]
})
export class EmployeeUsernamePatternDirective implements Validator {

  validate(control: AbstractControl): {[key: string]: any} | null {
    return new RegExp(/^[\w-_]+$/).test(control.value) ? null : { appEmployeeUsernamePattern : { value: true } };
  }
}
