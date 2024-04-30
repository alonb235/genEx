import { Component, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-retirement-contribution-slider',
  standalone: true,
  imports: [MatSliderModule, FormsModule],
  templateUrl: './retirement-contribution-slider.component.html',
  styleUrl: './retirement-contribution-slider.component.css'
})
export class RetirementContributionSliderComponent {
  @Input() income!: number;
  @Input() companyMatch!: number;
  value = 0;
  @Input() totalContribution!: number;
  contributionLimit = 23000
  maxContributionPercentage = this.contributionLimit / this.income * 100

  valueChange = () => {
    if (this.value <= this.companyMatch) {
      this.totalContribution = (this.income * (this.value / 100)) * 2
    } else {
      this.totalContribution = (this.income * (this.value/100)) + (this.income * (this.companyMatch/100))
    }
  }
}
