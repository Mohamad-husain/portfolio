import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeWorkComponent } from './home-work.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HomeWorkComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tiltX = 0;
  tiltY = 0;

  moveScene(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.tiltX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
    this.tiltY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
  }

  resetScene(): void {
    this.tiltX = 0;
    this.tiltY = 0;
  }
}
