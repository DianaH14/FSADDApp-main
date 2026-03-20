import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  images: CarouselImage[] = [];
  currentIndex = 0;

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.images = [
      {
        id: 1,
        src: 'https://ik.imagekit.io/95ifsepdv/photography/1200x680.jpg',
        alt: 'Featured photograph 1'
      },
      {
        id: 2,
        src: 'https://ik.imagekit.io/95ifsepdv/photography/Macroscape.jpg',
        alt: 'Featured photograph 2'
      },
      {
        id: 3,
        src: 'https://ik.imagekit.io/95ifsepdv/default-image.jpg?updatedAt=1772831305662',
        alt: 'Featured photograph 3'
      },
      {
        id: 4,
        src: 'https://ik.imagekit.io/95ifsepdv/photography/Free-High-Quality-Images-Death-to-the-Stock-Photo.jpg',
        alt: 'Featured photograph 4'
      }
    ];
  }

  previousImage(): void {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  nextImage(): void {
    this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
  }

  get currentImage(): CarouselImage {
    return this.images[this.currentIndex];
  }
}
