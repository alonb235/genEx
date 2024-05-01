import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from 'components/main-page/main-page.component';
import { ChatBoxComponent } from 'components/chat-box/chat-box.component';
import { ChatBubbleComponent } from 'components/chat-bubble/chat-bubble.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MainPageComponent, ChatBubbleComponent, ChatBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  chatVisible: boolean = false;

  openChat() {
    this.chatVisible = !this.chatVisible;
  }
}