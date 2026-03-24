import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  readonly language = inject(LanguageService);

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
          'Experienta a fost impecabila de la prima discutie pana la galerie. Fiecare fotografie are emotie reala si rafinament.',
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

}
