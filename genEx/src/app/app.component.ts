import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { YourIraComponent } from './components/your-ira/your-ira.component';
=======
import { RetirementContributionSliderComponent } from './components/retirement-contribution-slider/retirement-contribution-slider.component';
>>>>>>> main

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, YourIraComponent],
=======
  imports: [RetirementContributionSliderComponent],
>>>>>>> main
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'genEx';
}
