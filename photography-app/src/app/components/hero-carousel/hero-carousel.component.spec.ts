import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { HeroCarouselComponent } from './hero-carousel.component';
import { LanguageService } from '../../core/language.service';

class MockLanguageService {
  private readonly languageSignal = signal<'ro' | 'en'>('en');
  readonly current = this.languageSignal.asReadonly();
  toggle(): void {
    this.languageSignal.set(this.languageSignal() === 'ro' ? 'en' : 'ro');
  }
}

describe('HeroCarouselComponent', () => {
  let component: HeroCarouselComponent;
  let fixture: ComponentFixture<HeroCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCarouselComponent],
      providers: [{ provide: LanguageService, useClass: MockLanguageService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCarouselComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the carousel and render the first image', fakeAsync(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.currentIndex).toBe(0);

    const activeImage: HTMLImageElement | null = fixture.nativeElement.querySelector('.slide.active img');
    expect(activeImage).toBeTruthy();
    expect(activeImage?.alt).toContain('Cinematic portrait');

    tick(5200);
    fixture.detectChanges();
    expect(component.currentIndex).toBe(1);
    flush();
  }));

  it('should navigate slides with next, previous, and goToSlide methods', fakeAsync(() => {
    fixture.detectChanges();

    component.nextSlide();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(1);

    component.previousSlide();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(0);

    component.previousSlide();
    fixture.detectChanges();
    expect(component.currentIndex).toBe(component.slides.length - 1);

    component.goToSlide(2);
    fixture.detectChanges();
    expect(component.currentIndex).toBe(2);
    flush();
  }));
});
