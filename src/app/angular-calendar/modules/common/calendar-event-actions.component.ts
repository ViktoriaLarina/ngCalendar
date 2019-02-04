import { Component, Input, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { trackByIndex } from './util';

@Component({
  selector: 'mwl-calendar-event-actions',
  template: `
    <ng-template
      #defaultTemplate
      let-event="event">
      <span *ngIf="event.actions" class="cal-event-actions">
        <a
          class="cal-event-action btn"
          href="javascript:;"
          *ngFor="let action of event.actions; trackBy:trackByIndex"
          (mwlClick)="action.onClick({event: event})"
          [ngClass]="action.cssClass"
          [innerHtml]="action.label">
        </a>
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event
      }">
    </ng-template>
  `,
  styles: [`
    .cal-event-action {
      padding: 4px 8px;
    }
  `]

})
export class CalendarEventActionsComponent {
  @Input()
  event: CalendarEvent;

  @Input()
  customTemplate: TemplateRef<any>;

  trackByIndex = trackByIndex;
}
