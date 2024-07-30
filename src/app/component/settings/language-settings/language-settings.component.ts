import {Component, inject, OnInit} from '@angular/core';

import {ReactiveFormsModule, FormBuilder, Validators, ValidationErrors} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {Observable} from "rxjs";
import {LangService} from "../../../service/lang/lang.service";
import {AsyncPipe, UpperCasePipe} from "@angular/common";
import {Language} from "../../../model/language";
import {Page} from "../../../model/page";
import {ChatService} from "../../../service/chat/chat.service";
import {ApiUserService} from "../../../service/api-user/api-user.service";
import {NewChatRequest} from "../../../model/new-chat-request";


@Component({
  selector: 'app-language-settings',
  templateUrl: './language-settings.component.html',
  styleUrl: './language-settings.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    AsyncPipe,
    UpperCasePipe
  ]
})
export class LanguageSettingsComponent implements OnInit {
  nativeLangOptions$: Observable<Page<Language>> | undefined = undefined
  newLangOptions$: Observable<Page<Language>> | undefined = undefined
  oldNativeLang: string[] = ['', ''];
  oldNewLang: string[] = ['', ''];
  errors = false;

  constructor(private langService: LangService, private chatService: ChatService) {}

  ngOnInit() {
    this.nativeLangOptions$ = this.langService.getNativeLangs();
    this.newLangOptions$ = this.langService.getNewLangs();
    this.langSettingsForm.valueChanges.subscribe(value => {
      if (value.newLang !== this.oldNewLang[1] && value.newLang) {
        this.oldNewLang.shift();
        this.oldNewLang.push(value.newLang);
        if (value.newLang === this.langSettingsForm.get('nativeLang')?.value) {
          this.langSettingsForm.patchValue({nativeLang: this.oldNewLang[0], newLang: value.newLang});
        }
      } else if (value.nativeLang !== this.oldNativeLang[1] && value.nativeLang) {
        this.oldNativeLang.shift();
        this.oldNativeLang.push(value.nativeLang);
        if (value.nativeLang === this.langSettingsForm.get('newLang')?.value) {
          this.langSettingsForm.patchValue({newLang: this.oldNativeLang[0], nativeLang: value.nativeLang});
        }
      }
    })
  }

  selectChange(event: MatSelectChange) {
  }

  private fb = inject(FormBuilder);
  langSettingsForm = this.fb.group({
    nativeLang: ['', Validators.required],
    newLang: ['', Validators.required],
    name: ['', Validators.required]
  });

  onSubmit(): void {
    this.errors = false;
    Object.keys(this.langSettingsForm.value).forEach((key: string) => {
      const errors: ValidationErrors | null = this.langSettingsForm.get(key)!.errors;
      if (errors != null) {
        this.errors = true;
      }
    });

    if (!this.errors) {
      alert(`Native Lang: ${this.langSettingsForm.get('nativeLang')?.value}\nNew Lang: ${this.langSettingsForm.get('newLang')?.value}`);
      const newNativeLang: string = this.langSettingsForm.get('nativeLang')!.value!;
      const newNewLang: string = this.langSettingsForm.get('newLang')!.value!;
      const name: string = this.langSettingsForm.value.name!;
      const request: NewChatRequest = {
        chatName: name,
        chatNativeLangModelLocalesCode: newNativeLang,
        chatNewLangModelLocalesCode: newNewLang
      }
      this.chatService.createNewChat(request).subscribe();
    } else {
      alert('Bro fill out the form')
    }
  }
}
