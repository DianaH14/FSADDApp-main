import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestimonialsComponent } from './testimonials.component';
import { ApiService, ReviewResponseDto } from '../../services/api.service';
import { LanguageService } from '../../core/language.service';
import { signal } from '@angular/core';

class MockLanguageService {
  private readonly languageSignal = signal<'ro' | 'en'>('en');
  readonly current = this.languageSignal.asReadonly();
  toggle(): void {
    this.languageSignal.set(this.languageSignal() === 'ro' ? 'en' : 'ro');
  }
}

class MockApiService {
  getReviews = jasmine.createSpy('getReviews').and.returnValue(
    of([] as ReviewResponseDto[])
  );
}

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;
  let apiService: MockApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsComponent],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as unknown as MockApiService;
  });

  it('should render fallback static testimonials when backend reviews are empty', () => {
    fixture.detectChanges();
    expect(component.backendReviews.length).toBe(0);
    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toBe(4);
    expect(cards[0].textContent).toContain('We truly recognized ourselves');
  });

  it('should render backend reviews when getReviews returns data', () => {
    const backendReviews: ReviewResponseDto[] = [
      {
        id: 'review-1',
        userId: 'user-1',
        username: 'Backend User',
        rating: 5,
        comment: 'Excellent experience',
        createdAt: '2026-05-13T00:00:00.000Z'
      }
    ];

    apiService.getReviews.and.returnValue(of(backendReviews));
    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain('Excellent experience');
    expect(component.trackByReview(0, backendReviews[0])).toBe('review-1');
  });
});
