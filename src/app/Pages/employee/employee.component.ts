import { Component, OnInit } from '@angular/core';
import { Employee } from './../../Models/employee';
import { EmployeeService } from 'src/app/Service/employee.service';
import { EmployeeDepartmentService } from 'src/app/Service/employee-department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/Service/users.service';
import { AlertComponent } from 'src/app/Pop up/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  minContractDate: string = '2008-01-01';
  message: string = '';
  errMes: string = '';
  departments: any[] = [];
  employees: Employee[] = [];
  employee: Employee = this.getEmptyEmployee();
  isEditMode: boolean = false;

  constructor(
    private empSer: EmployeeService,
    private empDepSer: EmployeeDepartmentService,
    private snackBar: MatSnackBar,
    public usersService: UsersService,
    public dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.fetchDepartments().then(() => {
      this.fetchEmployees();
    });
  }

  fetchDepartments(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.empDepSer.getDepartments().subscribe(
        (response: any) => {
          if (
            response.succeeded &&
            response.data &&
            Array.isArray(response.data)
          ) {
            this.departments = response.data;
            console.log('Departments fetched successfully:', this.departments);
            resolve();
          } else {
            console.error('Unexpected response format:', response);
            reject('Failed to fetch departments');
          }
        },
        (error) => {
          console.error('Error fetching departments:', error);
          reject(error);
        }
      );
    });
  }

  fetchEmployees(): void {
    this.empSer.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        console.log('Employees fetched successfully:', this.employees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  addOrUpdateEmp(): void {
    if (this.isEditMode) {
      this.updateEmp();
    } else {
      this.addEmp();
    }
  }

  addEmp(): void {
    this.empSer.addEmp(this.employee).subscribe(
      (response: any) => {
        if (response.succeeded) {
          this.snackBar.open('Added Successfully', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['green-snackbar', 'mt-5'],
            duration: 2000,
          });

          this.message = response.message;
          this.ngOnInit();
        } else {
          this.snackBar.open('Error Adding Employee', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['red-snackbar', 'mt-5'],
            duration: 2000,
          });
        }
      },
      (error) => {
        this.snackBar.open('Error Adding Employee', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['red-snackbar', 'mt-5'],
          duration: 2000,
        });
      }
    );
  }

  updateEmp(): void {
    const updatedEmployee: Employee = { ...this.employee };

    this.empSer.updateEmp(updatedEmployee).subscribe(
      (response: any) => {
        if (response.succeeded) {
          this.snackBar.open('Edited Successfully', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['green-snackbar', 'mt-5'],
            duration: 2000,
          });
          this.ngOnInit();
          this.isEditMode = false;
          setTimeout(() => {
            this.message = ''; // Clear message after 3 seconds
          }, 3000);
        } else {
          this.snackBar.open('Error Editing Employee', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['red-snackbar', 'mt-5'],
            duration: 2000,
          });
        }
      },
      (error) => {
        this.snackBar.open('Error Editing Employee', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['red-snackbar', 'mt-5'],
          duration: 2000,
        });
      }
    );
  }

  deleteEmp(nationalId: string): void {
    const dialogRef = this.dialogRef.open(AlertComponent, {
      data: {
        employeeId: nationalId,
        alerttype: 'delete',
        entityType: 'employee',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadInitialData();
    });
  }

  editEmp(emp: Employee): void {
    this.employee = { ...emp };
    this.isEditMode = true;
  }

  resetForm(): void {
    this.employee = this.getEmptyEmployee();
    this.isEditMode = false;
  }

  getEmptyEmployee(): Employee {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      dateOfBirth: '',
      nationality: '',
      nationalId: '',
      hireDate: '',
      salary: 0,
      attendanceTime: '',
      departureTime: '',
      isDeleted: false,
      departmentId: 0,
      departmentName: '',
    };
  }

  getDepartmentName(departmentId: number): string {
    console.log('getDepartmentName() called with departmentId:', departmentId); // Add this logging statement
    const department = this.departments.find((dep) => dep.id === departmentId);
    console.log(`Finding department for ID ${departmentId}:`, department); // Add this logging statement
    return department ? department.name : 'Unknown';
  }
}
