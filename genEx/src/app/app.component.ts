import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YourIraComponent } from './components/your-ira/your-ira.component';
import { CommonModule } from '@angular/common';
import { RetirementContributionSliderComponent } from './components/retirement-contribution-slider/retirement-contribution-slider.component';
import { ChatBubbleComponent } from 'components/chat-bubble/chat-bubble.component';
import { ChatBoxComponent } from 'components/chat-box/chat-box.component';
import { MainPageComponent } from 'components/main-page/main-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, YourIraComponent, RetirementContributionSliderComponent, ChatBubbleComponent, ChatBoxComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  chatVisible: boolean = false;

  openChat() {
    this.chatVisible = !this.chatVisible;
  }
}