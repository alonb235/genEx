import { Component, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ChatBubbleComponent } from 'components/chat-bubble/chat-bubble.component';
import { NgComponentOutlet, AsyncPipe, DOCUMENT } from '@angular/common'
import { FundsComponent } from 'components/funds/funds.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [MatFormFieldModule,MatTableModule, MatInputModule, FormsModule, MatButtonModule, CommonModule, NgComponentOutlet, AsyncPipe, ChatBubbleComponent, FundsComponent],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
  constructor(private elemRef: ElementRef) {
  }
  @ViewChild('messageInput') messageInput: ElementRef
  messages = [];
  onClick(msg) {
    this.messages.push({ user: true, msg: msg })
    this.messages.push({ user: false, msg: msg })
  }
}
