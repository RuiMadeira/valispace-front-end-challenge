import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee';
import { EmployeeRole } from 'src/app/models/employee-role.enum';
import { ManageEmployeeService } from '../../services/manage-employee/manage-employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
const PHONES: string[] = [
  '992312312', '986733455', '971232343', '992362345', '912342303',
];
const ROLES: string[] = Object.values(EmployeeRole);

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  roles = ROLES;
  displayedColumns: string[] = ['id', 'username', 'phone', 'role', 'name', 'manage'];
  dataSource: MatTableDataSource<Employee>;
  employeeSelected: Employee;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private manageEmployeeService: ManageEmployeeService, private snackBar: MatSnackBar) {
    // Create 100 employees
    // const employees = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // this.dataSource = new MatTableDataSource(employees);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.manageEmployeeService.getEmployeeList());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public selectEmployeeForEdit(employee: Employee): void {
    this.employeeSelected = { ...employee };
  }

  public newEmployee(): void {
    this.employeeSelected = { id: undefined, username: undefined, phone: undefined, role: undefined, name: undefined };
  }

  public addEmployee(): void {
    this.postActionBehaviour(this.manageEmployeeService.createEmployee(this.employeeSelected),
      'Employee added successfully',  'Error adding employee');
  }

  public editSelectedEmployee(): void {
    this.postActionBehaviour(this.manageEmployeeService.editEmployee(this.employeeSelected),
      'Employee edited successfully',  'Error editing employee');
  }

  public deleteEmployee(employee: Employee): void {
    this.postActionBehaviour(this.manageEmployeeService.deleteEmployee(employee),
      'Employee deleted successfully',  'Error deleting employee');
  }

  public cancelEditing(): void {
    this.employeeSelected = undefined;
  }

  private postActionBehaviour(condition: boolean, messageSuccess: string, messageFailure: string): void {
    if (condition) {
      this.snackBar.open(messageSuccess, 'Close', { duration: 3000 });
      this.employeeSelected = undefined;
      this.dataSource = new MatTableDataSource(this.manageEmployeeService.getEmployeeList());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.snackBar.open(messageFailure, 'Close', { duration: 3000 });
    }
  }
}

function createNewUser(id: number): Employee {
  const username = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  const phone = PHONES[Math.round(Math.random() * (PHONES.length - 1))];
  const role = EmployeeRole[ROLES[Math.round(Math.random() * (ROLES.length - 1))]];

  return { id, name, username, phone, role };
}
