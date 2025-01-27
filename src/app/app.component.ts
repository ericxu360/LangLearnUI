import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainNavigationComponent} from "./component/main-navigation/main-navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Language POT: Practice, Observe, Train';
}
