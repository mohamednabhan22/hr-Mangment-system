import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings } from 'src/app/Models/settings';
import { SettingService } from 'src/app/Service/setting.service';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent {
  settings: Settings = {} as Settings;
  message: string = '';
  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  constructor(
    private settingService: SettingService,
    private _snackBar: MatSnackBar,
    public usersService: UsersService
  ) {}
  Change() {
    if (this.settings.bonusRate < 0) {
      this.settings.bonusRate = 0;
    } else if (this.settings.penaltyRate < 0) {
      this.settings.penaltyRate = 0;
    }
  }

  createSettings() {
    this.settingService.updateSet(this.settings).subscribe(
      (response) => {
        this._snackBar.open('Added Successfully', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['green-snackbar', 'mt-5'],
          duration: 2000,
        });
        this.settings = {} as Settings;
      },
      (error) => {
        this._snackBar.open('Error Setting settings', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['red-snackbar', 'mt-5'],
          duration: 2000,
        });
      }
    );
  }
}
