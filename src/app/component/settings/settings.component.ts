import { Component } from '@angular/core';
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {LanguageSettingsComponent} from "./language-settings/language-settings.component";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    UserSettingsComponent,
    LanguageSettingsComponent,
    MatDivider
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
