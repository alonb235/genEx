import { Component } from '@angular/core';
import { HandlerService } from 'services/handler.service';
import { YourIraComponent } from '../your-ira/your-ira.component';
import { CommonModule } from '@angular/common';
import { RetirementContributionSliderComponent } from '../retirement-contribution-slider/retirement-contribution-slider.component';
import { ChatBubbleComponent } from '../chat-bubble/chat-bubble.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, YourIraComponent, RetirementContributionSliderComponent, ChatBubbleComponent, ChatBoxComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  componentsToDisplay = []  
  chatVisible: boolean = false;

  constructor(private readonly handlerService: HandlerService) {
    this.getComponents()
  }
  
  async getComponents() {
    await this.handlerService.postUserRequest('recently this user checked their account balance and contributes to their ira every month. display components based off of user history', 0)
    this.componentsToDisplay = this.handlerService.getComponentsToRender()
  }

  openChat() {
    this.chatVisible = !this.chatVisible;
  }
}
