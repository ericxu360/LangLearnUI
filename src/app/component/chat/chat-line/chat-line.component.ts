import {Component, Input} from '@angular/core';
import {MatListItem, MatListItemTitle} from "@angular/material/list";

@Component({
  selector: 'app-chat-line',
  standalone: true,
  imports: [
    MatListItem,
    MatListItemTitle
  ],
  templateUrl: './chat-line.component.html',
  styleUrl: './chat-line.component.css'
})
export class ChatLineComponent {
  @Input({required: true}) message!: string;
  @Input({required: true}) user!: string;

}
