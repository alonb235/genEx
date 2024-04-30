import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YourIraComponent } from './components/your-ira/your-ira.component';
import { RetirementContributionSliderComponent } from './components/retirement-contribution-slider/retirement-contribution-slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, YourIraComponent, RetirementContributionSliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  return
}