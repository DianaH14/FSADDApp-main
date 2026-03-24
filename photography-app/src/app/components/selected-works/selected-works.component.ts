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
      src: 'https://ik.imagekit.io/95ifsepdv/photography/portfolio/DSC_9436.jpg?updatedAt=1774375906630',
      altRo: 'peisaje',
      altEn: 'Landscapes'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/portfolio/DSC_6931.jpg?updatedAt=1774375883814',
      altRo: 'flori',
      altEn: 'Romantic cityscape couple frame'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/portfolio/DSC_5260.jpg?updatedAt=1774375800999',
      altRo: 'cuplu',
      altEn: 'Wedding detail editorial flatlay'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/portfolio/DSC_2681-Enhanced-NR.jpg?updatedAt=1774375986692',
      altRo: 'party',
      altEn: 'party'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/portfolio/DSC_9165.jpg?updatedAt=1774375880273',
      altRo: 'Portret',
      altEn: 'Golden hour outdoor portrait'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/portfolio/DSC_4665.jpg?updatedAt=1774376024890',
      altRo: 'sushi',
      altEn: 'Minimal architecture bridal scene'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/portfolio/DSC_2469.jpg?updatedAt=1774375767504',
      altRo: 'peisaj natura',
      altEn: 'Emotional candid celebration moment'
    },
    {
      src: 'https://ik.imagekit.io/95ifsepdv/photography/portfolio/DSC_4859.jpg?updatedAt=1774375993586',
      altRo: 'strada',
      altEn: 'Refined monochrome editorial composition'
    }
  ];

}
