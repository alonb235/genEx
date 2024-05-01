import { Component, ComponentFactoryResolver, inject, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgComponentOutlet, AsyncPipe, CommonModule } from '@angular/common'
import { HandlerService } from 'services/handler.service';

@Component({
    selector: 'chat-bubble',
    standalone: true,
    imports: [NgComponentOutlet, AsyncPipe, CommonModule],
    template: `
      <div>
        <div *ngIf="!responseIsString" style="padding: 5px; border-radius: 10px;">
          <ng-container #container style="background-color: white;"></ng-container>
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

    @Input() msg: string = "";

    ngOnInit(): void {
      this.sendMessage(this.msg)
    }

    public currentCompon: { component: Type<any>; inputs: Record<any, any>; }
    public responseIsString: boolean = false;
    public responseText: string;

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