import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-schedule-confirmation-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-confirmation-page.component.html',
  styleUrls: ['./schedule-confirmation-page.component.scss']
})
export class ScheduleConfirmationPageComponent {
  readonly language = inject(LanguageService);
  private readonly router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }
}
