import { Component } from '@angular/core';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'


@Component({
  selector: 'app-your-ira',
  standalone: true,
  imports: [MatFormFieldModule, MatLabel, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './your-ira.component.html',
  styleUrl: './your-ira.component.css'
})
export class YourIraComponent {

}
