import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(private authService: UsersService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole: string[] = route.data['expectedRole'];

    if (
      this.authService.isUserLoggedIn() &&
      this.authService.hasRole(expectedRole)
    ) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
