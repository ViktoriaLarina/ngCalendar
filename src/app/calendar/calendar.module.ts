import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CalendarService} from "@calendar/services/calendar.service";
import {SharedModule} from "@shared/shared.module";
import {CalendarPageComponent} from "@calendar/components/calendar-page/calendar-page.component";
import {EventFormComponent} from "@calendar/components/event-form/event-form.component";

import { FlatpickrModule } from 'angularx-flatpickr';
import {CalendarModule} from "@angular-calendar/modules/calendar.module";
import {DateAdapter} from "@angular-calendar/date-adapters/date-adapter";
import {adapterFactory} from "@angular-calendar/date-adapters/date-fns";

@NgModule({
  declarations: [
    CalendarPageComponent,
    EventFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot(),
  ],
  providers: [
    CalendarService,
    EventFormComponent
  ]
})
export class CalendarPageModule { }
