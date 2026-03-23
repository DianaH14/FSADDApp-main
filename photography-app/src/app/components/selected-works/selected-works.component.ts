import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-selected-works',
  imports: [],
  templateUrl: './selected-works.component.html',
  styleUrl: './selected-works.component.scss'
})
export class SelectedWorksComponent {
  readonly language = inject(LanguageService);

  readonly works = [
    {
      src: 'assets/images/portfolio-1.jpg',
      altRo: 'Portret in lumina laterala fina',
      altEn: 'Portrait in soft side light'
    },
    {
      src: 'assets/images/portfolio-2.jpg',
      altRo: 'Cadru romantic urban de cuplu',
      altEn: 'Romantic cityscape couple frame'
    },
    {
      src: 'assets/images/portfolio-3.jpg',
      altRo: 'Detaliu de nunta in stil editorial',
      altEn: 'Wedding detail editorial flatlay'
    },
    {
      src: 'assets/images/portfolio-4.jpg',
      altRo: 'Portret elegant la receptie black tie',
      altEn: 'Black tie elegant reception portrait'
    },
    {
      src: 'assets/images/portfolio-5.jpg',
      altRo: 'Portret exterior la ora aurie',
      altEn: 'Golden hour outdoor portrait'
    },
    {
      src: 'assets/images/portfolio-6.jpg',
      altRo: 'Scena de mireasa in arhitectura minimalista',
      altEn: 'Minimal architecture bridal scene'
    },
    {
      src: 'assets/images/portfolio-7.jpg',
      altRo: 'Moment candid plin de emotie',
      altEn: 'Emotional candid celebration moment'
    },
    {
      src: 'assets/images/portfolio-8.jpg',
      altRo: 'Compozitie editoriala monocroma rafinata',
      altEn: 'Refined monochrome editorial composition'
    }
  ];

}
