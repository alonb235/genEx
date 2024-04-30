import { Component, inject } from '@angular/core';
import { NgComponentOutlet, AsyncPipe } form '@angular/common'
import { MatSliderModule } from '@angular/material/slider'
import { FormsModule } from '@angular/forms'
import { HandlerService } from 'services/handler.service';

@Component({
    selector: 'chat-bubble',
    standalone: true,
    imports: [NgComponentOutlet, AsyncPipe],
    template: `
      <div>
        <ng-container *ngComponentOutlet="
          currentComponent.component;
          inputs: currentComponent.inputs;
        " />
        <button (click)="sendMessage()">Next</button>
      </div>
    `
  })
  export class ChatBubbleComponent {
    private compList = inject(HandlerService).getComponentsToRender();
  
    get currentAd() {
      return this.compList.pop();
    }

    sendMessage() {
        inject(HandlerService).postUserMessage("A user is asking what their 401(k) contribution percentage is and what their employer will match. As a response please display an interactive web component for the user", 0);
    }
    
  }