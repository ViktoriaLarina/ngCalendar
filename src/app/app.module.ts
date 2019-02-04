import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {DocumentPageComponent} from './components/home-inner-pages/document-page/document-page.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {HeaderComponent} from './components/header/header.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {NotesPageComponent} from './components/home-inner-pages/notes-page/notes-page.component';
import {TasksPageComponent} from './components/home-inner-pages/tasks-page/tasks-page.component';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from "@shared/shared.module";
import {CalendarPageModule} from '@calendar/calendar.module'
import {AuthenticationModule} from "@authentication/authentication/authentication.module";


@NgModule({
  declarations: [
    AppComponent,
    DocumentPageComponent,
    ErrorPageComponent,
    HeaderComponent,
    HomePageComponent,
    NotesPageComponent,
    TasksPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CalendarPageModule,


    SharedModule,
    CalendarPageModule,
    AuthenticationModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
