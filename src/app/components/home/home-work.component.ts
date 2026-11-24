import { RevealDirective } from '../../shared/reveal.directive';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-work',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './home-work.component.html',
  styleUrl: './home-work.component.css'
})
export class HomeWorkComponent {}
