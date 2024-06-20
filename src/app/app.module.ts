import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './Pages/signin/signin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UsersGroupsComponent } from './Pages/users-groups/users-groups.component';
import { UserRegisterComponent } from './Pages/user-register/user-register.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AnnualHolidaysComponent } from './Pages/annual-holidays/annual-holidays.component';
import { AlertComponent } from './Pop up/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { manageattendenceComponent } from './Pop up/manage-attendence/manage-attendence.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { DepartmentsComponent } from './Pages/departments/departments.component';
import { AttendanceDepartureComponent } from './Pages/attendance-departure/attendance-departure.component';
import { NgxPrintModule } from 'ngx-print';
import { SettingComponent } from './Components/setting/setting.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './Pages/home/home.component';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UsersGroupsComponent,
    UserRegisterComponent,
    EmployeeComponent,
    NavbarComponent,
    AnnualHolidaysComponent,
    AlertComponent,
    manageattendenceComponent,
    EmployeeSalaryComponent,
    NotFoundComponent,
    DepartmentsComponent,
    AttendanceDepartureComponent,
    SettingComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxPrintModule,
    MatSelectModule,
    MatAutocompleteModule,
    AsyncPipe,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
