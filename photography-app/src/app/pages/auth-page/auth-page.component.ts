import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  readonly language = inject(LanguageService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  authMode: 'login' | 'register' = 'login';
  statusMessage = '';

  authForm = this.formBuilder.group({
    name: ['', [Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  toggleMode(mode: 'login' | 'register'): void {
    this.authMode = mode;
    this.statusMessage = '';
  }

  submit(): void {
    if (this.authForm.invalid || (this.authMode === 'register' && this.authForm.controls.name.invalid)) {
      this.statusMessage = 'Please complete the form correctly.';
      return;
    }

    const email = this.authForm.controls.email.value?.trim() ?? '';
    const password = this.authForm.controls.password.value ?? '';

    if (this.authMode === 'login') {
      this.api.login({ email, password }).subscribe({
        next: (response) => {
          localStorage.setItem('fsadd_token', response.token);
          this.router.navigate(['/schedule']);
        },
        error: () => {
          this.statusMessage = 'Login failed. Check your email and password.';
        }
      });
      return;
    }

    const name = this.authForm.controls.name.value?.trim() ?? '';
    this.api.register({ name, email, password }).subscribe({
      next: (response) => {
        localStorage.setItem('fsadd_token', response.token);
        this.router.navigate(['/schedule']);
      },
      error: () => {
        this.statusMessage = 'Registration failed. Please use a different email.';
      }
    });
  }
}
