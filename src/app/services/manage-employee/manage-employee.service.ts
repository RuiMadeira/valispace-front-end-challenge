import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';

const EMPLOYEE_CURRENT_ID_KEY = 'employeeCurrentId';
const EMPLOYEE_LIST_KEY = 'employeeList';

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

  public checkPhoneAvailability(employeeId: number, phone: string): boolean {
    const check = employeeId ?
      employee => employee.id !== employeeId && employee.phone === phone :
      employee => employee.phone === phone;
    return !this.getEmployeeList().some(check);
  }

  public createEmployee(employeeCreated: Employee): boolean {
    const id = this.getCurrentEmployeeId() + 1;
    const currentEmployeeList = this.getEmployeeList();
    const newEmployee = { ...employeeCreated, id };
    localStorage.setItem(EMPLOYEE_CURRENT_ID_KEY, id.toString());
    localStorage.setItem(EMPLOYEE_LIST_KEY, JSON.stringify(currentEmployeeList.concat(newEmployee)));
    return true;
  }

  public editEmployee(employeeEdited: Employee): boolean {
    const newEmployeeList = this.getEmployeeList().map(employee => employee.id === employeeEdited.id ? { ...employeeEdited } : employee);
    localStorage.setItem(EMPLOYEE_LIST_KEY, JSON.stringify(newEmployeeList));
    return true;
  }

  public deleteEmployee(employeeDeleted: Employee): boolean {
    const newEmployeeList = this.getEmployeeList().filter(employee => employee.id !== employeeDeleted.id);
    localStorage.setItem(EMPLOYEE_LIST_KEY, JSON.stringify(newEmployeeList));
    return true;
  }

  public getEmployeeById(id: number): Employee {
    return this.getEmployeeList().filter(employee => employee.id === id)[0];
  }

  public getEmployeesByUsername(searchTerm: string): Array<Employee> {
    return this.getEmployeeList().filter(employee => employee.username.toLowerCase().startsWith(searchTerm.toLowerCase()));
  }

  public getEmployeesByPhone(searchTerm: string): Array<Employee> {
    return this.getEmployeeList().filter(employee => employee.phone.startsWith(searchTerm));
  }
}
