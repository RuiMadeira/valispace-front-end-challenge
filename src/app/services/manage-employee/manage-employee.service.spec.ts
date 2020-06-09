import { TestBed } from '@angular/core/testing';
import { EmployeeRole } from '../../models/employee-role.enum';
import { ManageEmployeeService } from './manage-employee.service';

describe('ManageEmployeeService', () => {
  let service: ManageEmployeeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('employee should be created', () => {
    expect(service.getEmployeeList()).toEqual([]);
    const employee = {id: 1, username: 'DesignerBoy', role: EmployeeRole.Designer, phone: '1234567', name: 'Nacho Ruiz' };
    service.createEmployee(employee);
    expect(service.getEmployeeList()).toEqual([employee]);
  });
});
