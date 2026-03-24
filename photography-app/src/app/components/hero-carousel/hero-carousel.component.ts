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
      src: 'https://ik.imagekit.io/95ifsepdv/photography/carousel/DSC_9726.jpg?updatedAt=1774375688059',
      altRo: 'Portret cinematic in lumina naturala calda',
      altEn: 'Cinematic portrait in warm natural light'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/carousel/DSC_5969.jpg?updatedAt=1774375687164',
      altRo: 'Cuplu elegant incadrat de arhitectura',
      altEn: 'Elegant couple framed by architecture'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/carousel/DSC_2835.JPG?updatedAt=1774375689587',
      altRo: 'Prim-plan editorial cu umbre fine',
      altEn: 'Editorial close-up with soft shadows'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/portfolio/DSC_5945.jpg?updatedAt=1774375757912',
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
