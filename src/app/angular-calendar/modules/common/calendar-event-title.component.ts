import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'mwl-calendar-event-title',
  template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-view="view">
      <span class="cal-event-title date">{{ event.start | date : 'shortTime'}} - {{ event.end | date : 'shortTime'}}</span>

      <span
        class="cal-event-title"
        [innerHTML]="event.title | calendarEventTitle:view:event">
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        view: view
      }">
    </ng-template>
  `,
  styles: [`
    .cal-event-title {
      color: #212121;
    }
    
    .date {
      margin-right: 5px;
      font-weight: 700;
    }
    
    `]
})
export class CalendarEventTitleComponent {
  @Input()
  event: CalendarEvent;

  @Input()
  customTemplate: TemplateRef<any>;

  @Input()
  view: string;
}
