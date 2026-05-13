import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ContactCtaComponent } from './contact-cta.component';
import { ApiService, BookingCreateDto, UserDto } from '../../services/api.service';
import { LanguageService } from '../../core/language.service';
import { signal } from '@angular/core';

class MockLanguageService {
  private readonly languageSignal = signal<'ro' | 'en'>('en');
  readonly current = this.languageSignal.asReadonly();
  toggle(): void {
    this.languageSignal.set(this.languageSignal() === 'ro' ? 'en' : 'ro');
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockApiService {
  token: string | null = null;
  getToken(): string | null {
    return this.token;
  }

  getMe() {
    const user: UserDto = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      createdAt: '2026-05-13T00:00:00.000Z'
    };
    return of(user);
  }

  createBooking = jasmine.createSpy('createBooking').and.returnValue(of({}));
}

describe('ContactCtaComponent', () => {
  let component: ContactCtaComponent;
  let fixture: ComponentFixture<ContactCtaComponent>;
  let apiService: MockApiService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCtaComponent],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: ApiService, useClass: MockApiService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(ContactCtaComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as unknown as MockApiService;
    router = TestBed.inject(Router) as unknown as MockRouter;
    fixture.detectChanges();
  }

  it('should prompt login when user is not authenticated', () => {
    apiService = TestBed.inject(ApiService) as unknown as MockApiService;
    apiService.token = null;
    createComponent();

    expect(component.isLoggedIn).toBeFalse();
    expect(fixture.nativeElement.querySelector('.auth-panel')).toBeTruthy();

    component.navigateToAuth();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should show booking panel for authenticated users and load user data', () => {
    apiService = TestBed.inject(ApiService) as unknown as MockApiService;
    apiService.token = 'valid-token';
    createComponent();

    expect(component.isLoggedIn).toBeTrue();
    expect(component.userName).toBe('Test User');
    expect(fixture.nativeElement.querySelector('.booking-panel')).toBeTruthy();
  });

  it('should reject invalid booking submission and show validation message', () => {
    apiService = TestBed.inject(ApiService) as unknown as MockApiService;
    apiService.token = 'valid-token';
    createComponent();

    component.submitBooking();
    expect(component.statusMessage).toContain('Please complete all required booking fields.');
    expect(apiService.createBooking).not.toHaveBeenCalled();
  });

  it('should submit a booking successfully when the form is valid', () => {
    apiService = TestBed.inject(ApiService) as unknown as MockApiService;
    apiService.token = 'valid-token';
    createComponent();

    component.bookingForm.patchValue({
      fullName: 'Alex Johnson',
      email: 'alex@example.com',
      date: '2026-06-01',
      time: '10:00',
      location: 'Bucharest',
      sessionType: 'Couple Portrait',
      notes: 'No special requests'
    });

    component.submitBooking();
    expect(apiService.createBooking).toHaveBeenCalled();
    expect(component.statusMessage).toContain('Booking request submitted successfully.');
    expect(component.bookingForm.pristine).toBeTrue();
  });
});
