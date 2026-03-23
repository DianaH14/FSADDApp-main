import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly language = inject(LanguageService);
  private readonly title = inject(Title);

  constructor() {
    effect(() => {
      const selectedLanguage = this.language.current();
      document.documentElement.lang = selectedLanguage;

      this.title.setTitle(
        selectedLanguage === 'ro' ? 'Crisan Fotografie' : 'Crisan Photography'
      );
    });
  }
}
