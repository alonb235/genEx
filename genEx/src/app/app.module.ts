import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HandlerService } from './services/handler.service'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        AppComponent
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