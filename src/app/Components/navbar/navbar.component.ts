import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  username: string = '';
  constructor( public usersService: UsersService,private router:Router){}
  ngOnInit(): void {
    this.usersService.retreiveTokenData();
    this.username = this.usersService.loggedinUser.userFullName;
  }
logout(){
this.usersService.logoutUser();
this.router.navigate(['/signin']);
}
}
