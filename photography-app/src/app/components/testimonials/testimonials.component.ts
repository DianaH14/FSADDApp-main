import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { ApiService, ReviewCreateDto, ReviewResponseDto } from '../../services/api.service';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  readonly language = inject(LanguageService);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  backendReviews: ReviewResponseDto[] = [];
  statusMessage = '';
  isLoggedIn = false;

  reviewForm = this.formBuilder.group({
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
  });

  readonly testimonials = {
    ro: [
      {
        quote:
          'Ne-am regasit complet in imagini. Totul a fost discret, elegant, iar rezultatul depaseste orice asteptare.',
        author: 'Irina & Matei'
      },
      {
        quote:
          'Are un calm rar si un ochi exceptional pentru lumina. Fotografiile noastre par cadre dintr-un editorial autentic.',
        author: 'Diana R.'
      },
      {
        quote:
          'Experienta a fost impecabila de la prima discutie pana la galerie. Fiecare fotografie are emotie reala si rafiniment.',
        author: 'Andreea & Vlad'
      },
      {
        quote:
          'A stiut sa surprinda momentele pe care nici noi nu le-am observat. Albumul nostru este o comoara pe care o vom pastra toata viata.',
        author: 'Cristina & Radu'
      }
    ],
    en: [
      {
        quote:
          'We truly recognized ourselves in the images. Everything felt discreet, elegant, and beyond our expectations.',
        author: 'Irina & Matei'
      },
      {
        quote:
          'He has a rare calm and an exceptional eye for light. Our photographs feel like frames from a true editorial.',
        author: 'Diana R.'
      },
      {
        quote:
          'The experience was impeccable from our first call to the final gallery. Every image carries emotion and refinement.',
        author: 'Andreea & Vlad'
      },
      {
        quote:
          'He captured moments we hadn\'t even noticed ourselves. Our album is a treasure we will keep for a lifetime.',
        author: 'Cristina & Radu'
      }
    ]
  };

  constructor() {
    this.isLoggedIn = !!this.api.getToken();
    this.loadReviews();
  }

  private loadReviews(): void {
    this.api.getReviews().subscribe({
      next: (reviews) => {
        this.backendReviews = reviews;
      },
      error: () => {
        this.backendReviews = [];
      }
    });
  }

  submitReview(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth']);
      return;
    }

    if (this.reviewForm.invalid) {
      this.statusMessage = this.language.current() === 'ro'
        ? 'Te rog completeaza formularul de recenzie corect.'
        : 'Please complete the review form correctly.';
      return;
    }

    const body: ReviewCreateDto = this.reviewForm.value as ReviewCreateDto;
    this.api.postReview(body).subscribe({
      next: () => {
        this.statusMessage = this.language.current() === 'ro'
          ? 'Recenzia a fost trimisa cu succes.'
          : 'Review submitted successfully.';
        this.reviewForm.reset({ rating: 5, comment: '' });
        this.loadReviews();
      },
      error: () => {
        this.statusMessage = this.language.current() === 'ro'
          ? 'Nu s-a putut trimite recenzia. Incearca din nou.'
          : 'Could not submit review. Please try again.';
      }
    });
  }

  trackByReview(index: number, review: ReviewResponseDto): string {
    return review.id;
  }
}
