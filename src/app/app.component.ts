import { UsersService } from './Service/users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HRMangmentSystem-Frontend';
  constructor(public UsersService: UsersService) {}
}
