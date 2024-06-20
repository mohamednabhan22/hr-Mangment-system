import { Holiday } from './../interfaces/Holiday';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  baseUrl = 'https://localhost:44337/api/AnnualHolidays'; // API URL 
  constructor(private http: HttpClient) { }
  
  GetHolidays(){
    return this.http.get(`${this.baseUrl}/GetHolidays`);
  }

  createHoliday(holidayName: string , holidayDate:string){
    return this.http.post(`${this.baseUrl}/CreateHoliday`, {holidayName, holidayDate});
  }
  deleteHoliday(holidayId: number){
    return this.http.delete(`${this.baseUrl}/DeleteHoliday?holidayId=${holidayId}`);
  }

  updateHoliday(holiday: Holiday): Observable<Holiday> {
    const updateUrl = `${this.baseUrl}/EditHoliday/${holiday.id}`;  
    return this.http.put<Holiday>(updateUrl, holiday);  
  }
}
