import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';

import { HandlerService } from '../server/handler.service';

@Component({
  selector: 'interactiveChatResponse',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe],
  template: `
    <div>
      <ng-container *ngComponentOutlet="
        currentComponent.component;
        inputs: currentComponent.inputs;
      " />
    </div>
  `
})
export class interactiveChatResponseComponent {
  private componentList = inject(HandlerService).getComponentsToRender();

  get currentComponent() {
    return this.componentList.pop();
  }
}