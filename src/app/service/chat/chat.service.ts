import {Injectable} from '@angular/core';
import {Observable, of, switchMap, take} from "rxjs";
import {ChatLine} from "../../model/chat-line";
import {AuthService} from "@auth0/auth0-angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Chat} from "../../model/chat";
import {Page} from "../../model/page";
import {API_CONFIG} from "../../config/api-config";
import {ChatMessage} from "../../model/chat-message";
import {NewChatRequest} from "../../model/new-chat-request";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) {
  }

  createNewChat(request: NewChatRequest): Observable<Chat | null> {
    return this.httpClient.post<Chat>(`${API_CONFIG.baseUrl}/user/chats`, request);
  }

  getChats(page: number): Observable<Page<Chat>> {
    return this.httpClient.get<Page<Chat>>(`${API_CONFIG.baseUrl}/user/chats/${page}`);
  }

  getChatById(id: string): Observable<Chat | null> {
    return this.httpClient.get<Chat>(`${API_CONFIG.baseUrl}/chat/${id}/details`);
  }

  getChatLines(id: string, page: number): Observable<Page<ChatLine>> {
      return this.httpClient.get<Page<ChatLine>>(`${API_CONFIG.baseUrl}/chat/${id}/page/${page}`);
  }

  sendMessage(id: string, message: ChatMessage): Observable<ChatLine[] | null> {
      return this.httpClient.post<ChatLine[]>(`${API_CONFIG.baseUrl}/chat/${id}/send`, message);
  }


}
