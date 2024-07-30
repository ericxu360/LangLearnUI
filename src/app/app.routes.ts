import { Routes } from '@angular/router';
import {SettingsComponent} from "./component/settings/settings.component";
import {ChatComponent} from "./component/chat/chat.component";
import {ErrorComponent} from "./component/error/error.component";
import {LoginComponent} from "./component/login/login.component";
import {SignupComponent} from "./component/signup/signup.component";
import {AuthGuard, authGuardFn} from "@auth0/auth0-angular";
import {ChatListingComponent} from "./component/chat-listing/chat-listing.component";

export const routes: Routes = [
  {
    path: 'chat/:id',
    component: ChatComponent,
    title: 'Chat',
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    component: ChatListingComponent,
    title: 'All Chats',
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: '**',
    component: ErrorComponent,
    title: 'Error'
  }
];
