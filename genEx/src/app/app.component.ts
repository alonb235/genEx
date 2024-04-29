import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YourIraComponent } from './components/your-ira/your-ira.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, YourIraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'genEx';
}
