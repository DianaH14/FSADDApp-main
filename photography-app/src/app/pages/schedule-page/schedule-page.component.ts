import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
export class SchedulePageComponent implements OnInit {
  readonly language = inject(LanguageService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);

  isLoggedIn = false;
  statusMessage = '';

  bookingForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    date: ['', Validators.required]
  });

  ngOnInit(): void {
    this.isLoggedIn = !!this.api.getToken();
    if (this.isLoggedIn) {
      this.loadCurrentUser();
    }
  }

  navigateToAuth(): void {
    this.router.navigate(['/auth'], { queryParams: { returnUrl: '/schedule' } });
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

    const values = this.bookingForm.value as {
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      phone: string | null;
      date: string | null;
    };

    const bookingData: BookingCreateDto = {
      fullName: `${values.firstName?.trim() ?? ''} ${values.lastName?.trim() ?? ''}`.trim(),
      email: values.email ?? '',
      date: values.date ?? '',
      time: '10:00',
      location: 'Photoshoot request',
      sessionType: 'Photoshoot',
      notes: `Phone: ${values.phone ?? ''}`
    };

    this.api.createBooking(bookingData).subscribe({
      next: () => {
        this.statusMessage = this.language.current() === 'ro'
          ? 'Cererea ta a fost trimisa. Te voi contacta curand.'
          : 'Your request has been submitted. I will contact you soon.';
        this.bookingForm.reset();
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
        const [firstName, ...rest] = user.name.split(' ');
        this.bookingForm.controls.firstName.setValue(firstName);
        this.bookingForm.controls.lastName.setValue(rest.join(' ') || '');
        this.bookingForm.controls.email.setValue(user.email);
      },
      error: () => {
        // Keep the login state when a token exists, even if fetching user details fails.
        // This prevents the schedule page from showing the auth CTA after successful login.
      }
    });
  }
}
