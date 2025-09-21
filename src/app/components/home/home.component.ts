import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const typingEl = document.querySelector('.typing-text');
    if (typingEl) {
      setTimeout(() => {
        typingEl.classList.add('finished');
      }, 3200);
    }
  }
}
