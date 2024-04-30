import { Component } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { YourIraComponent } from './components/your-ira/your-ira.component';
=======
import { RetirementContributionSliderComponent } from './components/retirement-contribution-slider/retirement-contribution-slider.component';
>>>>>>> main
=======
import { RetirementContributionSliderComponent } from './components/retirement-contribution-slider/retirement-contribution-slider.component';
>>>>>>> f639f905b6f9404941ae577d3f607938f3ca7cfa

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
<<<<<<< HEAD
  imports: [RouterOutlet, YourIraComponent],
=======
  imports: [RetirementContributionSliderComponent],
>>>>>>> main
=======
  imports: [RetirementContributionSliderComponent],
>>>>>>> f639f905b6f9404941ae577d3f607938f3ca7cfa
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'genEx';
}
