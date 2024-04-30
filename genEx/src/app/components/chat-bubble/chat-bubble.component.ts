import { Component, inject, Type } from '@angular/core';
import { NgComponentOutlet, AsyncPipe } from '@angular/common'
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
          currentCompon.component;
          inputs: currentCompon.inputs;
        " />
        <button (click)="sendMessage()">Next</button>
      </div>
    `
  })
  export class ChatBubbleComponent {
    constructor(private readonly handlerService: HandlerService) {

    }

    public currentCompon: { component: Type<any>; inputs: Record<any, any>; }

    currentComponent() {
      return this.handlerService.getComponentsToRender().pop();
    }

    sendMessage() {
      this.handlerService.postUserRequest("A user is asking what their 401(k) contribution percentage is and what their employer will match. As a response please display an interactive web component for the user", 0);
      this.currentCompon = this.currentComponent()
    }
    
  }