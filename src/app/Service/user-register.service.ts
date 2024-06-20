import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from '../interfaces/user-register';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  baseUrl: string = 'https://localhost:44337/api/Account/';

  constructor(public http: HttpClient) {}

  registerUser(user: UserRegister) {
    return this.http.post(this.baseUrl + 'CreateAdmin', user);
  }
}
