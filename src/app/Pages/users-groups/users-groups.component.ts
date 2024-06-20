import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersGroupsService } from 'src/app/Service/users-groups.service';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css'],
})
export class UsersGroupsComponent {
  constructor(
    private groupService: UsersGroupsService,
    private snackBar: MatSnackBar
  ) { }

  pages: Page[] = [
    {
      name: 'Attendance',
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    {
      name: 'Employees',
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    {
      name: 'Salaries',
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    {
      name: 'Settings',
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  ];

  form = this.createForm();

  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      permissions: new FormArray(
        this.pages.map(
          (page) =>
            new FormGroup({
              name: new FormControl(page.name),
              create: new FormControl(page.create),
              read: new FormControl(page.read),
              update: new FormControl(page.update),
              delete: new FormControl(page.delete),
            })
        )
      ),
    });
  }

  get getName(): any {
    return this.form.controls['name'];
  }

  get getPermissions(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  setPermissions(event: any, index: number, controlName: string): void {
    const permission = this.getPermissions.controls[index];
    permission.get(controlName)?.setValue(event.target.checked);

    if (
      (controlName === 'create' ||
        controlName === 'update' ||
        controlName === 'delete') &&
      event.target.checked
    ) {
      permission.get('read')?.setValue(true);
    }
  }

  ischanged: boolean = false;

  onSubmit(): void {
    console.log(this.form.value);
    this.ischanged = false;

    for (let i = 0; i < this.getPermissions.length; i++) {
      if (
        this.getPermissions.controls[i].value.create ||
        this.getPermissions.controls[i].value.read ||
        this.getPermissions.controls[i].value.update ||
        this.getPermissions.controls[i].value.delete
      ) {
        this.ischanged = true;
        break;
      }
    }


    if (this.form.controls['name'].valid && this.ischanged) {
      this.groupService.createGroup(this.form.value).subscribe({
        next: (data) => {
          this.snackBar.open('Added Successfully', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['green-snackbar', 'mt-5'],
            duration: 2000,
          });
          this.form.reset();
          this.resetForm();
          let allChecks: any = Array.from(document.getElementsByClassName('form-check-input'));
          allChecks.forEach((check: any) => {
            check.checked = false;
          })
        },
        error: (error) => {
          this.snackBar.open('Added Successfully', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['green-snackbar', 'mt-5'],
            duration: 2000,
          });
        },
      });
    } else {
      this.form.controls['name'].invalid
        ? this.form.controls['name'].markAsDirty()
        : this.form.controls['permissions'].setErrors({ invalid: true });
    }
  }

  private resetForm(): void {
    this.form = this.createForm();
  }
}

interface Page {
  name: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
