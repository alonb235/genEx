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
      </div>
    `
  })
  export class ChatBubbleComponent {
    constructor(private readonly handlerService: HandlerService) {}

    public currentCompon: { component: Type<any>; inputs: Record<any, any>; }

    currentComponent() {
      return this.handlerService.getComponentsToRender().pop();
    }

   async  sendMessage(msg) {
      await this.handlerService.postUserRequest(msg, 0);
      // this.currentCompon = this.currentComponent()
      return this.currentComponent();
    }
    
  }