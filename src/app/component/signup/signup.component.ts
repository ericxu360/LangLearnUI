import {Component, inject, OnInit} from '@angular/core';
import {createEqualsValidator} from '../../validator/validators'

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn, FormsModule
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {Router} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {
    this.addressForm.controls['passwordConfirm'].addValidators(createEqualsValidator(
      this.addressForm.controls['password'],
      this.addressForm.controls['passwordConfirm']
    ));
    this.addressForm.controls['passwordConfirm'].updateValueAndValidity();
  }

  private errors = false;

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])]
  });

  onSubmit(): void {
    this.authService.loginWithRedirect().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
  }
}
