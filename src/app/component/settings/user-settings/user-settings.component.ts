import { Component, inject } from '@angular/core';

import {ReactiveFormsModule, FormBuilder, Validators, ValidationErrors} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {Router} from "@angular/router";
import {createEqualsValidator} from "../../../validator/validators";
import {ApiUserUpdate} from "../../../model/api-user-update";
import {ApiUserService} from "../../../service/api-user/api-user.service";


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class UserSettingsComponent {
  private fb = inject(FormBuilder);
  errors = false;
  userForm = this.fb.group({
    oldPass: ['', Validators.required],
    newPass: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  });

  constructor(private router: Router, private apiUserService: ApiUserService) {
    this.userForm.controls['passwordConfirm'].addValidators(createEqualsValidator(
      this.userForm.controls['newPass'],
      this.userForm.controls['passwordConfirm']
    ));
    this.userForm.controls['passwordConfirm'].updateValueAndValidity();
  }

  onSubmit(): void {
    this.errors = false;
    Object.keys(this.userForm.value).forEach((key: string) => {
      const errors: ValidationErrors | null = this.userForm.get(key)!.errors;
      if (errors != null) {
        this.errors = true;
      }
    });
    if (!this.errors) {
      const updateRequest: ApiUserUpdate = {
        password: this.userForm.value.newPass as (string | undefined)
      }

      this.apiUserService.updateUser(updateRequest).subscribe(result => {
        console.log(result);
      });

      Object.keys(this.userForm.value).forEach((key: string) => {
        alert(`${key}: ${this.userForm.get(key)!.value}`);
      })
    } else {
      alert('Fill in the form man')
    }
  }
}
