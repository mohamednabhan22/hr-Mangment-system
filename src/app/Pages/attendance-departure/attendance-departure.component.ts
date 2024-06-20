import { AttendanceService } from './../../Service/attendance.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AlertComponent } from 'src/app/Pop up/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { manageattendenceComponent } from 'src/app/Pop up/manage-attendence/manage-attendence.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { UsersService } from 'src/app/Service/users.service';
@Component({
  selector: 'app-attendance-departure',
  templateUrl: './attendance-departure.component.html',
  styleUrls: ['./attendance-departure.component.css'],
})
export class AttendanceDepartureComponent implements OnInit {
  attendancereport: any;
  myForm: FormGroup;
  searchText: string = '';
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialog,
    public AttendanceService: AttendanceService,
    public usersService: UsersService
  ) {
    this.myForm = this.fb.group(
      {
        startDate: [
          '',
          [Validators.required, this.maxDateValidator(new Date())],
        ],
        endDate: ['', [Validators.required, this.endDateValidator.bind(this)]],
      },
      { validator: this.dateValidator }
    );
  }

  ngOnInit(): void {
    this.AttendanceService.getallAttendance().subscribe((data) => {
      this.attendancereport = data;
    });
  }

  @ViewChild('content', { static: false }) content!: ElementRef;
  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

      const firstSheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const headers = jsonData[0];

      const formattedData = jsonData.slice(1).map((row) => {
        const formattedRow: any = {};
        headers.forEach((header: any, index: any) => {
          formattedRow[header] = row[index];
        });
        return formattedRow;
      });
    };

    reader.readAsArrayBuffer(file);
  }

  SavePDF(): void {
    const table = this.content.nativeElement;
    table
      .querySelectorAll(`th:nth-child(${7}), td:nth-child(${7})`)
      .forEach((cell: HTMLElement) => {
        cell.style.display = 'none';
      });

    const doc = new jsPDF();
    autoTable(doc, { html: table });
    doc.save('table.pdf');
  }
  delete(id: number) {
    const dialogRef = this.dialogRef.open(AlertComponent, {
      data: { id: id, alerttype: 'delete', entityType: 'attendance' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  reloadAttendanceData() {
    this.AttendanceService.getallAttendance().subscribe((data) => {
      this.attendancereport = data;
    });
  }

  edit(data: any) {
    const dialog = this.dialogRef.open(manageattendenceComponent, {
      data: { report: data },
    });
    dialog.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  dateValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate && startDate > endDate) {
      return { dateRangeError: true };
    }

    return null;
  }
  endDateValidator(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      return { invalidEndDate: true };
    }

    return null;
  }
  maxDateValidator(maxDate: Date) {
    return (control: AbstractControl) => {
      const selectedDate = new Date(control.value);

      if (
        selectedDate.getFullYear() > maxDate.getFullYear() ||
        (selectedDate.getFullYear() === maxDate.getFullYear() &&
          selectedDate.getMonth() > maxDate.getMonth()) ||
        (selectedDate.getFullYear() === maxDate.getFullYear() &&
          selectedDate.getMonth() === maxDate.getMonth() &&
          selectedDate.getDate() >= maxDate.getDate())
      ) {
        return { invalidStartDate: true };
      }

      return null;
    };
  }
  search() {
    const startDate = this.myForm.get('startDate')?.value;
    const endDate = this.myForm.get('endDate')?.value;
    if (this.searchText == '') {
      this.AttendanceService.filterAttendanceByDateOnly(
        startDate,
        endDate
      ).subscribe((data) => {
        this.attendancereport = data;
      });
    } else {
      this.AttendanceService.filterAttendanceByDateandname(
        startDate,
        endDate,
        this.searchText
      ).subscribe((data) => {
        this.attendancereport = data;
      });
    }
  }
  reset() {
    this.AttendanceService.getallAttendance().subscribe((data) => {
      this.attendancereport = data;
    });
  }
  add() {
    const dialog = this.dialogRef.open(manageattendenceComponent, {
      data: {
        report: {
          departmentName: '',
          employeeName: '',
          arrivalTime: '',
          departureTime: '',
          date: '',
        },
      },
    });
    dialog.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
}
