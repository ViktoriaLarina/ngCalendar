import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import {MonthViewDay, CalendarEvent} from 'calendar-utils';
import {trackByEventId} from '../common/util';
import {PlacementArray} from 'positioning';

@Component({
  selector: 'mwl-calendar-month-cell',
  templateUrl: './calendar-month-cell.component.html',
  host: {
    class: 'cal-cell cal-day-cell',
    '[class.cal-past]': 'day.isPast',
    '[class.cal-today]': 'day.isToday',
    '[class.cal-future]': 'day.isFuture',
    '[class.cal-weekend]': 'day.isWeekend',
    '[class.cal-in-month]': 'day.inMonth',
    '[class.cal-out-month]': '!day.inMonth',
    '[class.cal-has-events]': 'day.events.length > 0',
    '[class.cal-open]': 'day === openDay',
    '[class.cal-event-highlight]': '!!day.backgroundColor',
    '[style.backgroundColor]': 'day.backgroundColor'
  }
})
export class CalendarMonthCellComponent {
  @Input()
  day: MonthViewDay;

  @Input()
  openDay: MonthViewDay;

  @Input()
  locale: string;

  @Input()
  tooltipPlacement: PlacementArray;

  @Input()
  tooltipAppendToBody: boolean;

  @Input()
  customTemplate: TemplateRef<any>;

  @Input()
  tooltipTemplate: TemplateRef<any>;

  @Output()
  highlightDay: EventEmitter<any> = new EventEmitter();

  @Output()
  unhighlightDay: EventEmitter<any> = new EventEmitter();

  @Output()
  addBgImage: EventEmitter<any> = new EventEmitter();

  @Output()
  createNewEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  trackByEventId = trackByEventId;

  createEvent($event) {
    $event.stopPropagation();
    this.createNewEvent.emit(this.day);
  }

  addBgImg($event) {
    $event.stopPropagation();
    const fileObject = (document.getElementById('file') as HTMLInputElement).files[0];
    this.addBgImage.emit({
      day: this.day,
      file: fileObject
    });
  }
}
