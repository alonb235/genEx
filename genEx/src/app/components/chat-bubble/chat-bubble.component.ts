import { Component, ComponentFactoryResolver, inject, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgComponentOutlet, AsyncPipe } from '@angular/common'
import { MatSliderModule } from '@angular/material/slider'
import { FormsModule } from '@angular/forms'
import { Subscription } from 'rxjs';
import { HandlerService } from 'services/handler.service';
import { RetirementContributionSliderComponent } from '../retirement-contribution-slider/retirement-contribution-slider.component'

@Component({
    selector: 'chat-bubble',
    standalone: true,
    imports: [NgComponentOutlet, AsyncPipe],
    template: `
      <div>
        <ng-container #container></ng-container>
        <button (click)="sendMessage()">Next</button>
      </div>
    `
  })
  export class ChatBubbleComponent {
    @ViewChild('container', { read: ViewContainerRef}) container: ViewContainerRef;
    constructor(private readonly handlerService: HandlerService, private componentFactoryResolver: ComponentFactoryResolver) {

    }

    public currentCompon: { component: Type<any>; inputs: Record<any, any>; }
    private subscription: Subscription;

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    currentComponent() {
      const comp = this.handlerService.getComponentsToRender().pop()
      this.loadComponent(comp.component, comp.inputs)
    }

    async sendMessage() {
      await this.handlerService.postUserRequest("A user is asking what their IRA contributions is. As a response please display an interactive web component for the user", 0);
      this.subscription = this.handlerService.componentToRenderUpdated.subscribe(() => {
        this.currentComponent()
      })
    }

    loadComponent(component: Type<any>, inputs: Record<any,any>) {
      const componetFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = this.container.createComponent(componetFactory);
      for (const input in inputs) {
        componentRef.instance[input] = inputs[input]
      }
    }
  }