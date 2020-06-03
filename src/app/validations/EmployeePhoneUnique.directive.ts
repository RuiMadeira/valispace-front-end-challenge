import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { ManageEmployeeService } from '../services/manage-employee/manage-employee.service';

@Directive({
  selector: '[appEmployeePhoneUnique]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmployeePhoneUniqueDirective, multi: true}]
})
export class EmployeePhoneUniqueDirective implements Validator {
  @Input('appEmployeePhoneUnique') employeeId: number;

  constructor(private manageEmployeeService: ManageEmployeeService) {}

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.manageEmployeeService.checkPhoneAvailability(this.employeeId, control.value) ?
      null : { appEmployeePhoneUnique : { value: true } };
  }
}
