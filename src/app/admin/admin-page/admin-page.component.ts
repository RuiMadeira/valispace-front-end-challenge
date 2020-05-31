import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee';
import { EmployeeRole } from 'src/app/models/employee-role.enum';
import { ManageEmployeeService } from '../../services/manage-employee/manage-employee.service';

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
const PHONES: number[] = [
  992312312, 986733455, 971232343, 992362345, 912342303,
];
const ROLES: string[] = Object.values(EmployeeRole);

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'phone', 'role', 'name', 'manage'];
  dataSource: MatTableDataSource<Employee>;
  employeeSelected: Employee;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private manageEmployeeService: ManageEmployeeService) {
    // Create 100 employees
    const employees = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    this.dataSource = new MatTableDataSource(employees);
  }

  ngOnInit() {
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

  public selectEmployee(employee: Employee): void {
    this.employeeSelected = employee;
  }

  public addEmployee(): void {
    this.manageEmployeeService.createEmployee(this.employeeSelected);
  }

  public editEmployee(): void {
    this.manageEmployeeService.editEmployee(this.employeeSelected);
  }

  public deleteEmployee(employee: Employee): void {
    this.manageEmployeeService.editEmployee(employee);
  }
}

function createNewUser(id: number): Employee {
  const username = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  const phone = PHONES[Math.round(Math.random() * (PHONES.length - 1))]
  const role = ROLES[Math.round(Math.random() * (ROLES.length - 1))];

  return { id, name, username, phone, role };
};
