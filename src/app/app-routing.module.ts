import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Pages/signin/signin.component';
import { UsersGroupsComponent } from './Pages/users-groups/users-groups.component';
import { UserRegisterComponent } from './Pages/user-register/user-register.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { AttendanceDepartureComponent } from './Pages/attendance-departure/attendance-departure.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { AnnualHolidaysComponent } from './Pages/annual-holidays/annual-holidays.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { DepartmentsComponent } from './Pages/departments/departments.component';
import { SettingComponent } from './Components/setting/setting.component';
import { AuthGaurdService } from './Service/auth-gaurd.service';
import { RoleGuardService } from './Service/role-guard.service';
import { PreventLoginService } from './Service/prevent-login.service';
import { HomeComponent } from './Pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGaurdService] },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGaurdService, RoleGuardService], data: { expectedRole: ['SuperAdmin', 'Employees.Read'] } },
  { path: 'signin', component: SigninComponent, canActivate: [PreventLoginService] },
  { path: 'users-groups', component: UsersGroupsComponent, canActivate: [AuthGaurdService, RoleGuardService], data: { expectedRole: ['SuperAdmin'] } },
  { path: 'user-register', component: UserRegisterComponent, canActivate: [AuthGaurdService, RoleGuardService], data: { expectedRole: ['SuperAdmin'] } },
  { path: 'attendance-departure', component: AttendanceDepartureComponent, canActivate: [AuthGaurdService, RoleGuardService], data: { expectedRole: ['SuperAdmin', 'Attendance.Read'] } },
  { path: 'employee-salary', component: EmployeeSalaryComponent, canActivate: [AuthGaurdService, RoleGuardService], data: { expectedRole: ['SuperAdmin', 'Salaries.Read'] } },
  { path: 'annual-holidays', component: AnnualHolidaysComponent, canActivate: [AuthGaurdService, RoleGuardService], data: { expectedRole: ['SuperAdmin', 'Settings.Read'] } },
  { path: 'department', component: DepartmentsComponent, canActivate: [AuthGaurdService, RoleGuardService], data: { expectedRole: ['SuperAdmin'] } },
  { path: 'general-settings', component: SettingComponent, canActivate: [AuthGaurdService, RoleGuardService], data: { expectedRole: ['SuperAdmin', 'Settings.Read'] } },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
