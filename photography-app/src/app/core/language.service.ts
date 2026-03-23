import { Injectable, signal } from '@angular/core';

export type Language = 'ro' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly storageKey = 'crisan-language';
  private readonly languageSignal = signal<Language>('ro');

  readonly current = this.languageSignal.asReadonly();

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    const savedLanguage = window.localStorage.getItem(this.storageKey);
    if (savedLanguage === 'ro' || savedLanguage === 'en') {
      this.languageSignal.set(savedLanguage);
    }
  }

  setLanguage(language: Language): void {
    this.languageSignal.set(language);
    this.persist(language);
  }

  toggle(): void {
    const nextLanguage: Language = this.languageSignal() === 'ro' ? 'en' : 'ro';
    this.setLanguage(nextLanguage);
  }

  private persist(language: Language): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.storageKey, language);
    }
  }
}
