import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api-config";
import {Language} from "../../model/language";
import {Page} from "../../model/page";

@Injectable({
  providedIn: 'root'
})
export class LangService {

  private nativeLang: string = '';
  private newLang: string = '';

  constructor(private httpClient: HttpClient) { }

  setNativeLang(lang: string): Observable<boolean> {
    this.nativeLang = lang;
    return of(true)
  }

  getNativeLang(): string {
    return this.nativeLang;
  }

  setNewLang(lang: string): Observable<boolean> {
    this.newLang = lang;
    return of(true);
  }

  getNewLang(): string {
    return this.newLang;
  }

  getNativeLangs(page: number = 0): Observable<Page<Language>> {
    return this.httpClient.get<Page<Language>>(API_CONFIG.baseUrl + '/lang/page/' + page);
  }

  getNewLangs(page: number = 0): Observable<Page<Language>> {
    return this.httpClient.get<Page<Language>>(API_CONFIG.baseUrl + '/lang/page/' + page);
  }
}
