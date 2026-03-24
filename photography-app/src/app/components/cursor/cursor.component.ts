import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
  decay: number;
}

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `
    <canvas #canvas class="cursor-canvas"></canvas>
    <div class="cursor-dot" [style.left.px]="mouseX" [style.top.px]="mouseY"></div>
  `,
  styles: [`
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 99999;
    }
    .cursor-canvas {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
    }
    .cursor-dot {
      position: fixed;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 6px 2px rgba(255,255,255,0.6);
      transform: translate(-50%, -50%);
      pointer-events: none;
      mix-blend-mode: difference;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CursorComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  mouseX = -100;
  mouseY = -100;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private rafId = 0;
  private lastX = -100;
  private lastY = -100;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.spawnParticles(e.clientX, e.clientY);
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  }

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize(canvas);
    window.addEventListener('resize', () => this.resize(canvas));
    this.loop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  private resize(canvas: HTMLCanvasElement): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private spawnParticles(x: number, y: number): void {
    const count = 3;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 1.2 + 0.4),
        alpha: Math.random() * 0.35 + 0.15,
        radius: Math.random() * 8 + 4,
        decay: Math.random() * 0.012 + 0.008,
      });
    }
  }

  private loop(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.radius *= 1.015;
      p.alpha -= p.decay;
    }

    this.particles = this.particles.filter(p => p.alpha > 0);

    for (const p of this.particles) {
      const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      grad.addColorStop(0, `rgba(200,190,180,${p.alpha})`);
      grad.addColorStop(1, `rgba(200,190,180,0)`);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = grad;
      this.ctx.fill();
    }

    this.rafId = requestAnimationFrame(() => this.loop());
  }
}
