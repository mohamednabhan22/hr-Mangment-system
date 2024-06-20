import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UsersService } from 'src/app/Service/users.service';
import { LoginUser } from 'src/app/interfaces/loginUser';
import { userToken } from 'src/app/interfaces/userToken';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(public userService: UsersService, public router: Router) {}
  userLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required]),
  });
  invalid: boolean = false;
  get getEmail() {
    return this.userLoginForm.controls['email'];
  }
  get getPassword() {
    return this.userLoginForm.controls['password'];
  }
  handleLogin(data: any) {
    data.preventDefault();
    if (this.userLoginForm.valid) {
      const loginUser: LoginUser = {
        UsernameOrEmail: this.userLoginForm.controls.email.value || '',
        password: this.userLoginForm.controls.password.value || '',
      };

      this.userService.loginUser(loginUser).subscribe({
        next: (response: any) => {
          localStorage.setItem('UserToken', response.data);
          const decodedToken: userToken = jwtDecode(response.data);
          this.userService.loggedinUser = decodedToken;
          this.router.navigate(['/']);
          console.log(true);
        },
        error: (error) => {
          if (error.status === 401 || error.status === 404) {
            console.log('Invalid email or password');
            this.invalid = true;
            this.userLoginForm.controls.password.setErrors({
              invalidLogin: true,
            });
          }
        },
      });
    }
  }
}
