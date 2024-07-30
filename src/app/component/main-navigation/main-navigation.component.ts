import {Component, inject, Input} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "@auth0/auth0-angular";
import {ChatService} from "../../service/chat/chat.service";
import {Chat} from "../../model/chat";
import {Page} from "../../model/page";
import {MatTree, MatTreeNode} from "@angular/material/tree";

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrl: './main-navigation.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    MatTree,
    MatTreeNode,
  ]
})
export class MainNavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  chats$: Observable<Page<Chat>> | undefined;
  @Input() title!: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(public authService: AuthService, private chatService: ChatService) {
    this.chats$ = chatService.getChats(0);
  }

  logout() {
    this.authService.logout();
  }
}
