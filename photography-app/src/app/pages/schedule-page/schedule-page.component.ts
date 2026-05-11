import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { ApiService, BookingCreateDto } from '../../services/api.service';

@Component({
  selector: 'app-schedule-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent {
  readonly language = inject(LanguageService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  isLoggedIn = false;
  statusMessage = '';
  userName = '';

  bookingForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    sessionType: ['', Validators.required],
    notes: ['']
  });

  constructor() {
    this.isLoggedIn = !!this.api.getToken();
    if (this.isLoggedIn) {
      this.loadCurrentUser();
    }
  }

  navigateToAuth(): void {
    this.router.navigate(['/auth']);
  }

  submitSchedule(): void {
    if (!this.isLoggedIn) {
      this.statusMessage = this.language.current() === 'ro'
        ? 'Te rugam sa te autentifici pentru a programa o sesiune.'
        : 'Please log in to schedule a session.';
      return;
    }

    if (this.bookingForm.invalid) {
      this.statusMessage = this.language.current() === 'ro'
        ? 'Completeaza toate campurile obligatorii corect.'
        : 'Please complete all required fields correctly.';
      return;
    }

    const bookingData = this.bookingForm.value as BookingCreateDto;
    this.api.createBooking(bookingData).subscribe({
      next: () => {
        this.statusMessage = this.language.current() === 'ro'
          ? 'Cererea ta a fost trimisa. Te voi contacta curand.'
          : 'Your request has been submitted. I will contact you soon.';
        this.bookingForm.reset({ fullName: this.userName, email: this.bookingForm.controls.email.value, notes: '' });
      },
      error: () => {
        this.statusMessage = this.language.current() === 'ro'
          ? 'Nu am putut inregistra programarea. Incearca din nou mai tarziu.'
          : 'Unable to schedule right now. Please try again later.';
      }
    });
  }

  private loadCurrentUser(): void {
    this.api.getMe().subscribe({
      next: (user) => {
        this.userName = user.name;
        this.bookingForm.controls.fullName.setValue(user.name);
        this.bookingForm.controls.email.setValue(user.email);
      },
      error: () => {
        this.isLoggedIn = false;
      }
    });
  }
}
