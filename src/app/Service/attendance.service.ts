import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeAttendence } from '../interfaces/EmployeeAttendence';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  baseUrl = 'https://localhost:44337/api/AttendanceReport';
  constructor(public http: HttpClient) {}
  getallAttendance() {
    return this.http.get(this.baseUrl + '/GetAttendanceReport');
  }
  deleteAttendance(id: number) {
    return this.http.delete(this.baseUrl + '/DeleteAttendanceReport?id=' + id);
  }
  updateAttendence(data: any) {
    return this.http.put(this.baseUrl + '/UpdateAttendanceReport', data);
  }
  filterAttendanceByDateOnly(fromDate: any, toDate: any) {
    return this.http.get(
      this.baseUrl +
        '/GetAttendanceReportWithFilter?FromDate=' +
        fromDate +
        '&ToDate=' +
        toDate
    );
  }
  filterAttendanceByDateandname(fromDate: any, toDate: any, name: any) {
    return this.http.get(
      this.baseUrl +
        '/GetAttendanceReportWithFilter?EmpNameOrDeptName=' +
        name +
        '&FromDate=' +
        fromDate +
        '&ToDate=' +
        toDate
    );
  }
  addAttendence(data: EmployeeAttendence) {
    return this.http.post(this.baseUrl + '/AddAttendanceReport', data);
  }
}
