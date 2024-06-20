import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDepartmentService } from './../../Service/employee-department.service'; // Import your department service
import { AttendanceService } from 'src/app/Service/attendance.service'; // Import your employee service
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  constructor(
    private departmentService: EmployeeDepartmentService,
    private attendanceService: AttendanceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private empSer: EmployeeService,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: 0;
      alerttype: string;
      entityType: string;
      employeeId: string;
    }
  ) {}

  confirm() {
    if (this.data.alerttype === 'delete') {
      switch (this.data.entityType) {
        case 'department':
          this.departmentService.deleteDepartment(this.data.id).subscribe(
            () => {
              this.snackBar.open('Deleted Successfully', 'X', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['green-snackbar', 'mt-5'],
                duration: 2000,
              });
            },
            (error) => {
              this.snackBar.open('Error Deleting Department ', 'X', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['red-snackbar', 'mt-5'],
                duration: 2000,
              });
            }
          );
          break;
        case 'attendance':
          this.attendanceService.deleteAttendance(this.data.id).subscribe(
            () => {
              this.snackBar.open('Deleted Successfully', 'X', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['green-snackbar', 'mt-5'],
                duration: 2000,
              });
            },
            (error) => {
              this.snackBar.open('Error Deleting Department ', 'X', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['red-snackbar', 'mt-5'],
                duration: 2000,
              });
            }
          );
          break;
        case 'employee':
          this.empSer.deleteEmp(this.data.employeeId).subscribe(
            (response: any) => {
              if (response.succeeded) {
                this.snackBar.open('Deleted Successfully', 'X', {
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                  panelClass: ['green-snackbar', 'mt-5'],
                  duration: 2000,
                });
              } else {
                this.snackBar.open('Error Deleting Department ', 'X', {
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                  panelClass: ['red-snackbar', 'mt-5'],
                  duration: 2000,
                });
              }
            },
            (error) => {
              this.snackBar.open('Error Deleting Department ', 'X', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['red-snackbar', 'mt-5'],
                duration: 2000,
              });
            }
          );
          break;
        default:
          console.error('Invalid entityType:', this.data.entityType);
          break;
      }
    }
  }

  private navigateBack() {
    const previousUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(previousUrl);
  }
}
