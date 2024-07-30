import {Component, Input, OnInit} from '@angular/core';
import {ChatLine} from "../../model/chat-line";
import {ChatLineComponent} from "./chat-line/chat-line.component";
import {HttpClient} from "@angular/common/http";
import {ChatService} from "../../service/chat/chat.service";
import {Observable, of} from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";
import { Page } from '../../model/page';
import {FormsModule} from "@angular/forms";
import {ChatMessage} from "../../model/chat-message";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatLineComponent,
    AsyncPipe,
    MatDivider,
    MatInput,
    MatLabel,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatSuffix,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  lines$: Observable<Page<ChatLine>>;
  error: boolean = false;
  chatId!: string;
  message: string = '';

  @Input()
  set id(chatId: string) {
    this.chatId = chatId
    this.lines$ = this.chatService.getChatLines(chatId, 0);
  }

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) {
    this.lines$ = of();
  }

  sendMessage(event: SubmitEvent): void {
    if (this.message) {
      const request: ChatMessage = {
        message: this.message
      }
      this.chatService.sendMessage(this.chatId, request).subscribe(() => {
        this.lines$ = this.chatService.getChatLines(this.chatId, 0);
      })
    }
  }


}
