import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { ApiService, BookingCreateDto } from '../../services/api.service';

@Component({
  selector: 'app-contact-cta',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-cta.component.html',
  styleUrl: './contact-cta.component.scss'
})
export class ContactCtaComponent {
  readonly language = inject(LanguageService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  bookingForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    date: ['', Validators.required],
    time: ['', Validators.required],
    location: ['', Validators.required],
    sessionType: ['', Validators.required],
    notes: ['']
  });

  statusMessage = '';
  isLoggedIn = false;
  userName = '';

  constructor() {
    this.isLoggedIn = !!this.api.getToken();
    if (this.isLoggedIn) {
      this.loadCurrentUser();
    }
  }

  navigateToAuth(): void {
    this.router.navigate(['/auth']);
  }

  submitBooking(): void {
    if (!this.isLoggedIn) {
      this.statusMessage = 'Please log in or register first to submit a booking.';
      return;
    }

    if (this.bookingForm.invalid) {
      this.statusMessage = 'Please complete all required booking fields.';
      return;
    }

    const bookingData = this.bookingForm.value as BookingCreateDto;
    this.api.createBooking(bookingData).subscribe({
      next: () => {
        this.statusMessage = 'Booking request submitted successfully.';
        this.bookingForm.reset();
      },
      error: (error) => {
        this.statusMessage = 'Unable to submit booking. Please try again later.';
        console.error(error);
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
