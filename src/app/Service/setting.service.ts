import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from '../Models/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  apiURL = 'https://localhost:44337/api/Settings/';
  constructor(private http: HttpClient) {}
  creatSet(set: Settings) {
    return this.http.post(this.apiURL + 'CreateSettings', set);
  }
  updateSet(set: Settings) {
    return this.http.put(this.apiURL + 'UpdateSettings', set);
  }
  deleteSet(settingId: number) {
    return this.http.delete(
      `${this.apiURL}DeleteSettings?settingId=${settingId}`
    );
  }
}
