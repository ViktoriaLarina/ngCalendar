import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit, OnDestroy
} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {
  CalendarEvent, CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from '../../../angular-calendar';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';

import {InteractionService} from "@services/interaction.service";
import {CalendarService} from "@calendar/services/calendar.service";
import {StaticData} from "@shared/staticData";
import {StaticDataCalendar} from "@calendar/StaticDataCalendar";


@Component({
  selector: 'app-calendar-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit, OnDestroy {
  get modalContent(): TemplateRef<any> {
    return this._modalContent;
  }

  set modalContent(value: TemplateRef<any>) {
    this._modalContent = value;
  }

  @ViewChild('modalContent')
  private _modalContent: TemplateRef<any>;
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[];
  activeDayIsOpen: boolean;
  currentDay: Date;
  showEventDialog = new Subject<any>();
  maxSize: number;

  subscribeEventList: Subscription;

  actions: CalendarEventAction[];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(private service: CalendarService, private interactionService: InteractionService) {
  }

  ngOnInit(): void {
    this.actions = [
      {
        label: '<i class="fa fa-edit"></i>',
        onClick: ({event}: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        }
      },
      {
        label: '<i class="fa fa-trash"></i>',
        onClick: ({event}: { event: CalendarEvent }): void => {
          this.handleEvent('Deleted', event);
        }
      }
    ];
    this.maxSize = StaticData.MAX_SIZE_FILE;
    this.events = [];
    this.subscribeEventList = this.service.eventsList.subscribe((data: CalendarEvent[]) => {
      data.map(item => item.actions = this.actions);
      this.events = data;
      this.refresh.next();
      if(!this.events.find(e => e.start.getDate() == this.viewDate.getDate())) {
        this.activeDayIsOpen = false;
      }
    });

    this.service.getEventList();
  }

  handleEvent(action: string, event: CalendarEvent): void {  // click on the event in month view
    this.modalData = {event, action};
    if (action === 'Deleted') {

      this.deleteItem(event);
    } else if (action === 'Edited') {
      this.editItem(event);
    }
  }

  deleteItem(event: CalendarEvent) {
    this.service.deleteEvent(event.id);
  }

  editItem(event: CalendarEvent) {
    console.log(event);
    // this.showEventDialog.next(event);
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      this.activeDayIsOpen = (!isSameDay(this.viewDate, date) || !this.activeDayIsOpen) && events.length > 0;
    }
  }

  createEvent(day) {
    if (!day.isFuture && !day.isToday) {
      return;
    }
    this.currentDay = day.date;
    console.log(this.currentDay);
      this.showEventDialog.next(this.currentDay);
  }

  checkFile(data) {
    if (!data.file) {
      return;
    }
    this.currentDay = data.day.date;
    if (data.file.type !== 'image/png' || data.file.type !== 'image/jpg' || data.file.type !== 'image/jpeg') {
      this.interactionService.alert.next(StaticData.ALERT_DATA_IMG_FORMAT);
    } else if (data.file.size >= this.maxSize) {
      this.interactionService.alert.next(StaticData.ALERT_DATA_IMG_SIZE);
    } else {
      this.service.sendImage(data, this.currentDay);
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  ngOnDestroy(): void {
    this.subscribeEventList.unsubscribe();
  }

}
