import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ChatBubbleComponent } from 'components/chat-bubble/chat-bubble.component';
import { NgComponentOutlet, AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-chat-box',
  standalone: true,
  providers: [ChatBubbleComponent],
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule, NgComponentOutlet, AsyncPipe],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
  constructor(private chatBubbleComponent: ChatBubbleComponent) {}
  messages = [
    {user: true, msg: 'hello'},
    {user: false, msg: 'world'}
  ];
  components = {}
  componentsId = 0
  async onClick(msg) {
    msg = "A user is asking what their 401(k) contribution percentage is and what their employer will match. As a response please display an interactive web component for the user"
    const currentId = this.componentsId
    this.components[currentId] = await this.chatBubbleComponent.sendMessage(msg)
    console.log(this.components[currentId])
    this.messages.push({user: false, msg: `
    <div>
      <ng-container *ngComponentOutlet="
        components[currentId].component;
        inputs: currentCompon[currentId].inputs;
      " />
    </div>
  `})
    this.componentsId++;
  }
}
