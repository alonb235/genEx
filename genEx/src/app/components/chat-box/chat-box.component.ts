import { Component, inject } from '@angular/core';
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
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule, NgComponentOutlet, AsyncPipe, ChatBubbleComponent],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
  messages = [
    {user: true, msg: 'hello', component: false},
    {user: false, msg: 'world', component: false}
  ];
  msg = "A user is asking what their 401(k) contribution percentage is and what their employer will match. As a response please display an interactive web component for the user"
  onClick(msg) {
    msg = this.msg
    this.messages.push({user: true, msg: msg, component: false})
    this.messages.push({user: false, msg: msg, component: true})
  }
}
