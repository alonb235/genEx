import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HandlerService } from './services/handler.service'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatBubbleComponent } from 'components/chat-bubble/chat-bubble.component';
import { RetirementContributionSliderComponent } from 'components/retirement-contribution-slider/retirement-contribution-slider.component';
import { YourIraComponent } from 'components/your-ira/your-ira.component';

@NgModule({
    declarations: [
        AppComponent,
        ChatBubbleComponent,
        RetirementContributionSliderComponent,
        YourIraComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        AppComponent,
        BrowserAnimationsModule
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: "/"
        },
        HandlerService,
    ],
    bootstrap: [AppComponent],
})

export class AppModule {}