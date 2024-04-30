import { Component } from '@angular/core';
import { RetirementContributionSliderComponent } from './components/retirement-contribution-slider/retirement-contribution-slider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RetirementContributionSliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title= "Hello"
  ngOnInit() {

  }
}
