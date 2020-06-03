import { EmployeeRole } from './employee-role.enum';

export interface Employee {
    id: number;
    username: string;
    phone: string;
    role: EmployeeRole;
    name: string;
}
