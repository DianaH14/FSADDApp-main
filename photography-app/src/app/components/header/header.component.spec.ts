import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';
import { HeaderComponent } from './header.component';
import { LanguageService } from '../../core/language.service';

class MockLanguageService {
  private readonly languageSignal = signal<'ro' | 'en'>('ro');
  readonly current = this.languageSignal.asReadonly();

  toggle(): void {
    this.languageSignal.set(this.languageSignal() === 'ro' ? 'en' : 'ro');
  }
}


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let languageService: MockLanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [{ provide: LanguageService, useClass: MockLanguageService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService) as unknown as MockLanguageService;
    fixture.detectChanges();
  });

  it('should create the header component and render the schedule link', () => {
    expect(component).toBeTruthy();
    const anchors = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];
    const scheduleAnchor = anchors.find((anchor) =>
      anchor.textContent?.trim().toLowerCase().includes('programeaza')
    );
    expect(scheduleAnchor).toBeTruthy();
  });

  it('should toggle language state when the language button is clicked', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.lang-toggle');
    expect(button.textContent?.trim()).toBe('EN');

    button.click();
    fixture.detectChanges();

    expect(button.textContent?.trim()).toBe('RO');
    expect(languageService.current()).toBe('en');
  });
});
