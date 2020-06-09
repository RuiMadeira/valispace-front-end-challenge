import { TestBed } from '@angular/core/testing';
import { EmployeeRole } from '../../models/employee-role.enum';
import { ManageEmployeeService } from './manage-employee.service';

describe('ManageEmployeeService', () => {
  let service: ManageEmployeeService;
  const testEmployees = [
    { id: 1, username: 'DesignerBoy', role: EmployeeRole.Designer, phone: '1234567', name: 'Nacho Ruiz' },
    { id: 2, username: 'SalezzMaster', role: EmployeeRole.Sales, phone: '7654321', name: 'Pedro Sellmethispen' },
    { id: 3, username: 'OriginalBoy', role: EmployeeRole.CEO, phone: '1234567', name: 'Sancho Guerrero' },
    { id: 4, username: 'TalkTalkTalk', role: EmployeeRole.PR, phone: '7654321', name: 'John Anchorman Smith' },
    { id: 5, username: 'TalkingHead', role: EmployeeRole.PR, phone: '7654321', name: 'Jessie MacMedia' },
  ];

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
    service.createEmployee(testEmployees[0]);
    expect(service.getEmployeeList()).toEqual([testEmployees[0]]);
  });

  it('employee should be edited', () => {
    expect(service.getEmployeeList()).toEqual([]);
    service.createEmployee(testEmployees[0]);
    expect(service.getEmployeeList()).toEqual([testEmployees[0]]);
    service.editEmployee({ ...testEmployees[0], username: 'DesignerMaster' });
    expect(service.getEmployeeList()).toEqual([{ ...testEmployees[0], username: 'DesignerMaster' }]);
  });

  it('employee should be deleted', () => {
    expect(service.getEmployeeList()).toEqual([]);
    service.createEmployee(testEmployees[0]);
    expect(service.getEmployeeList()).toEqual([testEmployees[0]]);
    service.deleteEmployee(testEmployees[0]);
    expect(service.getEmployeeList()).toEqual([]);
  });

  it('get by id should return correct employee', () => {
    expect(service.getEmployeeList()).toEqual([]);
    testEmployees.forEach(employee => service.createEmployee(employee));
    expect(service.getEmployeeById(2)).toEqual(testEmployees[1]);
  });

  it('get by username should return correct employees', () => {
    expect(service.getEmployeeList()).toEqual([]);
    testEmployees.forEach(employee => service.createEmployee(employee));
    expect(service.getEmployeesByUsername('Talk')).toEqual([testEmployees[3], testEmployees[4]]);
  });

  it('get by username should return correct employees', () => {
    expect(service.getEmployeeList()).toEqual([]);
    testEmployees.forEach(employee => service.createEmployee(employee));
    expect(service.getEmployeesByPhone('1234')).toEqual([testEmployees[0], testEmployees[2]]);
  });
});
