import { Component, ComponentFactoryResolver, inject, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgComponentOutlet, AsyncPipe, CommonModule } from '@angular/common'
import { Subscription } from 'rxjs';
import { HandlerService } from 'services/handler.service';

@Component({
    selector: 'chat-bubble',
    standalone: true,
    imports: [NgComponentOutlet, AsyncPipe, CommonModule],
    template: `
      <div>
        <div *ngIf="!responseIsString" style="background-color: white; padding: 5px; border-radius: 10px;">
          <ng-container #container></ng-container>
        </div>
        <div #elseBlock>
          <p>{{responseText}}</p>
        </div>
      </div>
    `
  })
  export class ChatBubbleComponent {
    @ViewChild('container', { read: ViewContainerRef}) container: ViewContainerRef;
    constructor(private readonly handlerService: HandlerService, private componentFactoryResolver: ComponentFactoryResolver) {}

    @Input() msg: string = "A user is asking what their IRA contributions is. As a response please display an interactive web component for the user";

    ngOnInit(): void {
      this.sendMessage(this.msg)
    }

    public currentCompon: { component: Type<any>; inputs: Record<any, any>; }
    public responseIsString: boolean = false;
    private subscription: Subscription;
    public responseText: string;

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    currentComponent() {
      const comp = this.handlerService.getComponentsToRender().pop()
      this.loadComponent(comp.component, comp.inputs)
    }

    async sendMessage(msg) {
      let value = await this.handlerService.postUserRequest(msg, 0);
      if (typeof value != "string") {   
        this.responseIsString = false;
        this.currentComponent();
      } else {
        this.responseText = value;
        this.responseIsString = true;
      }
    }

    loadComponent(component: Type<any>, inputs: Record<any,any>) {
      const componetFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = this.container.createComponent(componetFactory);
      for (const input in inputs) {
        componentRef.instance[input] = inputs[input]
      }
    }
  }