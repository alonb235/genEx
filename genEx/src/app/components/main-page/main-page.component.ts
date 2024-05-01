import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandlerService } from 'services/handler.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  componentsToDisplay = []

  constructor(private readonly handlerService: HandlerService) {
    this.getComponents()
  }
  
  async getComponents() {
    await this.handlerService.postUserRequest('display all available components', 0)
    this.componentsToDisplay = this.handlerService.getComponentsToRender()
  }
}
