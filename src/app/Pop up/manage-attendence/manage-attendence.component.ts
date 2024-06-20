import { EmployeeAttendence } from './../../interfaces/EmployeeAttendence';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/Service/attendance.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-manage-attendence',
  templateUrl: './manage-attendence.component.html',
  styleUrls: ['./manage-attendence.component.css'],
})
export class manageattendenceComponent implements OnInit {
  timeForm: FormGroup;
  Flag = true;
  employees: any;
  employeeattend: EmployeeAttendence = {
    employeeNationalId: '',
    attendanceDate: '',
    arrivalTime: '',
    departureTime: '',
  };
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { report: any },
    public AttendanceService: AttendanceService,
    private fb: FormBuilder,
    private EmployeeService: EmployeeService
  ) {
    this.timeForm = this.fb.group(
      {
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        employeeid: [],
      },
      { validator: this.timeOrderValidator() }
    );
  }

  ngOnInit(): void {
    if (this.data.report.employeeName == '') {
      this.Flag = false;
      this.EmployeeService.getEmployees().subscribe({
        next: (data: any) => {
          this.employees = data;
        },
      });
    }
  }
  confirm() {
    if (this.data.report.employeeName == '') {
      this.employeeattend.arrivalTime =
        this.timeForm.controls['startTime'].value;
      this.employeeattend.departureTime =
        this.timeForm.controls['endTime'].value;
      this.employeeattend.employeeNationalId =
        this.timeForm.controls['employeeid'].value;
      this.employeeattend.attendanceDate = this.getFormattedDate();
      console.log(this.employeeattend);

      this.AttendanceService.addAttendence(this.employeeattend).subscribe({
        next: (data: any) => {
          if (data.length == 0)
            this._snackBar.open('No Content', 'X', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['red-snackbar', 'mt-5'],
              duration: 2000,
            });
          else
            this._snackBar.open('Added Successfully', 'X', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['green-snackbar', 'mt-5'],
              duration: 2000,
            });
          this.router.navigate(['/attendance-departure']);
        },
        error: (error: any) => {
          this._snackBar.open('No Content', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        },
      });
    } else {
      this.data.report.arrivalTime = this.timeForm.controls['startTime'].value;
      this.data.report.departureTime = this.timeForm.controls['endTime'].value;
      this.AttendanceService.updateAttendence(this.data.report).subscribe({
        next: (data: any) => {
          if (data.length == 0) {
            this._snackBar.open('No Content', 'X', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['red-snackbar', 'mt-5'],
              duration: 2000,
            });
          } else
            this._snackBar.open('Edited Successfully', 'X', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['green-snackbar', 'mt-5'],
              duration: 2000,
            });
        },
        error: (error) => {
          this._snackBar.open('No Content', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['red-snackbar', 'mt-5'],
            duration: 2000,
          });
        },
      });
    }
  }

  timeOrderValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startTime = control.get('startTime')?.value;
      const endTime = control.get('endTime')?.value;

      if (startTime && endTime && startTime >= endTime) {
        return { timeOrder: true };
      }
      return null;
    };
  }
  getFormattedDate(): string {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${month}-${day}-${year}`;
  }
}
