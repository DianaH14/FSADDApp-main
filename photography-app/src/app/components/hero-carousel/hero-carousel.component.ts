import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-hero-carousel',
  imports: [],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss'
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  readonly language = inject(LanguageService);
  currentIndex = 0;
  readonly slides = [
    {
      src: 'assets/images/hero-1.jpg',
      altRo: 'Portret cinematic in lumina naturala calda',
      altEn: 'Cinematic portrait in warm natural light'
    },
    {
      src: 'assets/images/hero-2.jpg',
      altRo: 'Cuplu elegant incadrat de arhitectura',
      altEn: 'Elegant couple framed by architecture'
    },
    {
      src: 'assets/images/hero-3.jpg',
      altRo: 'Prim-plan editorial cu umbre fine',
      altEn: 'Editorial close-up with soft shadows'
    },
    {
      src: 'assets/images/hero-4.jpg',
      altRo: 'Scena minimalista cu miscare rafinata',
      altEn: 'Minimalist scene with refined movement'
    }
  ];

  private autoplayId?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.restartAutoplay();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.restartAutoplay();
  }

  previousSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.restartAutoplay();
  }

  private startAutoplay(): void {
    this.autoplayId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 5200);
  }

  private stopAutoplay(): void {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
      this.autoplayId = undefined;
    }
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

}
