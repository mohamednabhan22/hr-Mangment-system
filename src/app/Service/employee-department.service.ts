import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../Models/department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDepartmentService {
  baseUrl: string = 'https://localhost:44337/api/Departments/';

  constructor(private _httpsClient: HttpClient) { }

  getDepartments(): Observable<any[]> {
    return this._httpsClient.get<any[]>(this.baseUrl + 'GetAllDepartments');
  }

  getDepartmentById(id: number): Observable<any> {
    return this._httpsClient.get<any>(this.baseUrl + 'GetDepartmentById/' + id);
  }

  addDepartment(department: Department): Observable<any> {
    return this._httpsClient.post<any>(this.baseUrl + 'CreateDepartment', department);
  }

  updateDepartment(department: Department): Observable<any> {
    return this._httpsClient.put<any>(this.baseUrl + 'UpdateDepartment', department);
  }

  deleteDepartment(id: number): Observable<any> {
    return this._httpsClient.delete<any>(this.baseUrl + 'DeleteDepartment/' + id);
  }
}
