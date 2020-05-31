import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';

const EMPLOYEE_CURRENT_ID_KEY = 'employeeCurrentId';
const EMPLOYEE_LIST_KEY = 'employeeCurrentId';

@Injectable({
  providedIn: 'root'
})
export class ManageEmployeeService {

  private getCurrentEmployeeId(): number {
    const currentEmployeeId = localStorage.getItem(EMPLOYEE_CURRENT_ID_KEY);
    return currentEmployeeId ? Number.parseFloat(currentEmployeeId) : 0;
  }

  public getEmployeeList(): Array<Employee> {
    return JSON.parse(localStorage.getItem(EMPLOYEE_LIST_KEY)) ?? [];
  }

  public checkPhoneAvailability(phone: number): boolean {
    return !this.getEmployeeList().some((employee) => employee.phone === phone);
  }

  public createEmployee(this: ManageEmployeeService, employeeCreated: Employee): boolean {
    const id = this.getCurrentEmployeeId() + 1;
    const currentEmployeeList = this.getEmployeeList();
    const newEmployee = { ...employeeCreated, id };
    localStorage.setItem(EMPLOYEE_CURRENT_ID_KEY, id.toString());
    localStorage.setItem(EMPLOYEE_LIST_KEY, JSON.stringify(currentEmployeeList.concat(newEmployee)));
    return true;
  }

  public editEmployee(this: ManageEmployeeService, employeeEdited: Employee): boolean {
    const newEmployeeList = this.getEmployeeList().map((employee) => employee.id === employeeEdited.id ? employeeEdited : employee);
    localStorage.setItem(EMPLOYEE_LIST_KEY, JSON.stringify(newEmployeeList));
    return true;
  }

  public deleteEmployee(this: ManageEmployeeService, employeeDeleted: Employee): boolean {
    const newEmployeeList = this.getEmployeeList().filter((employee) => employee.id !== employeeDeleted.id);
    localStorage.setItem(EMPLOYEE_LIST_KEY, JSON.stringify(newEmployeeList));
    return true;
  }
}
