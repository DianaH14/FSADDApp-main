import { Component } from '@angular/core';
import { ContactCtaComponent } from '../../components/contact-cta/contact-cta.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroCarouselComponent } from '../../components/hero-carousel/hero-carousel.component';
import { PhilosophyComponent } from '../../components/philosophy/philosophy.component';
import { SelectedWorksComponent } from '../../components/selected-works/selected-works.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeaderComponent,
    HeroCarouselComponent,
    PhilosophyComponent,
    SelectedWorksComponent,
    TestimonialsComponent,
    ContactCtaComponent,
    FooterComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
