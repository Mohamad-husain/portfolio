import { Component } from '@angular/core';
import { RevealDirective, SpotlightDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {}
