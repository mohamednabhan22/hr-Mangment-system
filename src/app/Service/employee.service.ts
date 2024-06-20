import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../Models/employee';
import { Department } from '../Models/department';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl: string = 'https://localhost:44337/api/Employees';
  departmentUrl: string = 'https://localhost:44337/api/Departments';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<any>(`${this.baseUrl}/GetAllEmployees`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching employees:', error);
        return throwError('Failed to fetch employees. Please try again later.');
      })
    );
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<any>(`${this.departmentUrl}/GetAllDepartments`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching departments:', error);
        return throwError('Failed to fetch departments. Please try again later.');
      })
    );
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  options = { headers: this.headers };
  apiURL = 'https://localhost:44337/api/Employees/';

  addEmp(emp: Employee): Observable<any> {
    return this.http.post<any>(`${this.apiURL}AddEmployee`, emp, this.options).pipe(
      map(response => response)
    );
  }

  updateEmp(emp: Employee): Observable<any> {
    return this.http.put<any>(`${this.apiURL}UpdateEmployee`, emp, this.options).pipe(
      map(response => response)
    );
  }

  deleteEmp(nationalId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}DeleteEmployee?NationalId=${nationalId}`).pipe(
      map(response => response)
    );
  }
}
