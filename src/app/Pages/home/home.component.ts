import { UsersService } from 'src/app/Service/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userData: any;
  constructor(public UsersService: UsersService ) {
    
  }
  ngOnInit(): void {
    this.UsersService.retreiveTokenData();
    console.log(this.UsersService.loggedinUser);;
    this.userData = this.UsersService.loggedinUser;
  }


}
