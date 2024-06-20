import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSalaryService {
  private apiUrl = 'https://localhost:44337/api/SalaryReport/GetSalaries';

  constructor(private http: HttpClient) { }

  getEmployeeSalaries(employeeName: string, date: string): Observable<any> {
    let params = new HttpParams();
    if (employeeName) {
      params = params.set('employeeName', employeeName);
    }
    if (date) {
      params = params.set('date', date);
    }

    return this.http.get(this.apiUrl, { params });
  }
}
