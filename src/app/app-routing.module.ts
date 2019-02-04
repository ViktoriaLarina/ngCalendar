import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DocumentPageComponent} from './components/home-inner-pages/document-page/document-page.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {LoginPageComponent} from './authentication/authentication/login-page/login-page.component';
import {NotesPageComponent} from './components/home-inner-pages/notes-page/notes-page.component';
import {TasksPageComponent} from './components/home-inner-pages/tasks-page/tasks-page.component';

import {LoginGuard} from './guards/login.guard';
import {HomeGuard} from './guards/home.guard';
import {CalendarPageComponent} from "@calendar/components/calendar-page/calendar-page.component";
import {ItemRouts, Routs} from "./shared/enums/routs";


const itemRoutes: Routes = [
  {
    path: ItemRouts.CALENDAR.toString(),
    component: CalendarPageComponent
  },
  {
    path: ItemRouts.DOCUMENT.toString(),
    component: DocumentPageComponent
  },
  {
    path: ItemRouts.NOTES.toString(),
    component: NotesPageComponent
  },
  {
    path: ItemRouts.TASKS.toString(),
    component: TasksPageComponent
  },
  {
    path: '**',
    redirectTo: ItemRouts.CALENDAR.toString()
  }
];

const routes: Routes = [
  {
    path: Routs.LOGIN.toString(),
    canActivate: [LoginGuard],
    component: LoginPageComponent
  },
  {
    path: Routs.HOME.toString(),
    children: itemRoutes,
    canActivate: [HomeGuard],
    component: HomePageComponent
  },
  {
    path: Routs.ERROR.toString(),
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: Routs.LOGIN.toString()
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
