import { Component, ComponentFactoryResolver, inject, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
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
      </div>
    `
  })
  export class ChatBubbleComponent {
    @ViewChild('container', { read: ViewContainerRef}) container: ViewContainerRef;
    constructor(private readonly handlerService: HandlerService, private componentFactoryResolver: ComponentFactoryResolver) {}

    @Input()
    msg = "A user is asking what their IRA contributions is. As a response please display an interactive web component for the user";

    ngOnInit(): void {
        this.sendMessage(this.msg)
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

    async sendMessage(msg) {
      await this.handlerService.postUserRequest(msg, 0);
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