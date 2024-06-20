import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { HolidayService } from 'src/app/Service/annual-holidays.service';
import { UsersService } from 'src/app/Service/users.service';
import { Holiday } from 'src/app/interfaces/Holiday';

@Component({
  selector: 'app-annual-holidays',
  templateUrl: './annual-holidays.component.html',
  styleUrls: ['./annual-holidays.component.css'],
})
export class AnnualHolidaysComponent implements OnInit {
  Holidays: any = [];
  selectedHoliday!: Holiday;

  Holiday: Holiday = {
    holidayName: '',
    holidayDate: '',
    id: 0,
  };

  constructor(
    private holidayService: HolidayService,
    public router: Router,
    private snackBar: MatSnackBar,
    public usersService: UsersService
  ) {}
  formHoliday = new FormGroup({
    holidayName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]'),
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    holidayDate: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
    ]),
  });

  get isholidayNameValid(): any {
    return this.formHoliday.controls.holidayName;
  }

  get isholidayDateValid(): any {
    return this.formHoliday.controls.holidayDate;
  }

  ngOnInit(): void {
    console.log('Holidays GetHolidays:', this.Holidays);
    this.GetHolidays();
  }

  GetHolidays() {
    this.holidayService.GetHolidays().subscribe(
      (res: any) => {
        this.Holidays = res.data;
      },
      (error) => {
        this.Holidays = [];
      }
    );
  }

  createHoliday() {
    this.holidayService
      .createHoliday(this.Holiday.holidayName, this.Holiday.holidayDate)
      .subscribe(
        (res: any) => {
          this.snackBar.open('Added Successfully', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['green-snackbar', 'mt-5'],
            duration: 2000,
          });
          this.GetHolidays();
        },
        (error) => {
          this.snackBar.open('Error Adding Department', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['red-snackbar', 'mt-5'],
            duration: 2000,
          });
        }
      );
    this.formHoliday.reset();
  }
  deleteHoliday(holidayId: number) {
    this.holidayService.deleteHoliday(holidayId).subscribe(
      (res: any) => {
        this.snackBar.open('Deleted Successfully', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['green-snackbar', 'mt-5'],
          duration: 2000,
        });
        this.GetHolidays();
      },
      (error) => {
        this.snackBar.open('Error Deleting Department', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['red-snackbar', 'mt-5'],
          duration: 2000,
        });
      }
    );
  }

  setUpdate(data: any) {
    this.Holiday.holidayName = data.holidayName;
    this.Holiday.holidayDate = data.holidayDate;
    this.Holiday.id = data.id;
  }

  updateHoliday() {
    let bodydata = {
      holidayName: this.Holiday.holidayName,
      holidayDate: this.Holiday.holidayDate,
      id: this.Holiday.id,
    };
    this.holidayService.updateHoliday(bodydata).subscribe(
      (res: any) => {
        this.snackBar.open('Updated Successfully', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['green-snackbar', 'mt-5'],
          duration: 2000,
        });
        this.GetHolidays();
      },
      (error) => {
        this.snackBar.open('Error Updating Department', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['red-snackbar', 'mt-5'],
          duration: 2000,
        });
      }
    );
  }

  save() {
    if (this.Holiday?.id === 0) {
      this.createHoliday();
    } else {
      this.updateHoliday();
    }
    this.formHoliday.reset();
  }
}
