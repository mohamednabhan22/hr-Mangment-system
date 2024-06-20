import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PreventLoginService implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) { }
  canActivate(): boolean {
    if (this.usersService.isUserLoggedIn()) { 
      return false;
    }
    else{ 
    //this.router.navigate(['/**']);
    return true;
    }
  }
  }

