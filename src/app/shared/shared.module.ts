import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "../interceptors/error-interceptor";
import {BASE_URL} from "../config";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {environment} from "@environments/environment";
import { AlertComponent } from './components/alert/alert.component';




@NgModule({
  declarations: [
    AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModalModule,
    NgbModule,
    AngularFontAwesomeModule,

  ], providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: BASE_URL,
      useValue: environment.baseUrl
    }
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModalModule,
    NgbModule,
    AngularFontAwesomeModule,
    AlertComponent
  ]
})
export class SharedModule { }
