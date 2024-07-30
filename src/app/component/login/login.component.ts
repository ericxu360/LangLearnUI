import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatOption,
    MatRadioButton,
    MatRadioGroup,
    MatSelect,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        console.log('Already authenticated');
        this.router.navigateByUrl('/settings');
      }
    });
  }

  onSubmit(): void {
    this.authService.loginWithRedirect();
  }
}
