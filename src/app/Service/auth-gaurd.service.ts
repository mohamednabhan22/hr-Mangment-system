import { Injectable } from '@angular/core';
import { CanActivate,Router  } from '@angular/router';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate  {

  constructor(private authService: UsersService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
