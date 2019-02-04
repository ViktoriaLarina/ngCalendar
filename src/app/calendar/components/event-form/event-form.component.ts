import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventTypeModel} from "@shared/models/event-type.model";
import {TimeModel} from "@shared/models/time.model";
import {EventType} from "@shared/enums/event-type";
import {IsNotEmpty} from "@shared/validators/isEmpty.validator";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventDto} from "@shared/models/eventDto.model";
import {CalendarService} from "@calendar/services/calendar.service";
import {Subject} from "rxjs/index";
import {StaticDataCalendar} from "@calendar/StaticDataCalendar";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input() showEventDialog: Subject<any>;
  @ViewChild("content") private template: TemplateRef<any>;

  eventDataForm = new FormGroup({});
  eventTypes: EventTypeModel[] = [];
  start: TimeModel;
  end: TimeModel;
  eventType: EventType;
  timeIntervalError: boolean;
  currentDay: any;

  constructor(private modal: NgbModal, private service: CalendarService) {
  }

  ngOnInit() {

    this.showEventDialog.subscribe(data => {
      this.open(data);
      this.currentDay = data;
    });
    this.start = StaticDataCalendar.START_EVENT_TIME;
    this.end = StaticDataCalendar.END_EVENT_TYPE;
    this.eventTypes = StaticDataCalendar.EVENT_TYPES;
    const temp = this.eventTypes.find((item: EventTypeModel) => item.isDefault === true);
    if (temp) {
      this.eventType = temp.value;
    } else {
      this.eventType = this.eventTypes[0].value;
    }

    this.eventDataForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.min(4), IsNotEmpty]),
      startTime: new FormControl(this.start, Validators.required),
      endTime: new FormControl(this.end, Validators.required)
    });

  }

  open(content) {
      this.modal.open(this.template, {ariaLabelledBy: 'modal-basic-title'});
  }

  fireOnChange(e): void {
    this.timeIntervalError = false;
    const startHour = this.eventDataForm.controls['startTime'].value.hour;
    const endHour = this.eventDataForm.controls['endTime'].value.hour;
    const startMinutes = this.eventDataForm.controls['startTime'].value.minute;
    const endMinutes = this.eventDataForm.controls['endTime'].value.minute;

    const startTime = startHour * 60 + startMinutes;
    const endTime = endHour * 60 + endMinutes;

    this.timeIntervalError = startTime > endTime;
  }

  checkForm() {
    Object.keys(this.eventDataForm.controls).forEach((key) => {
      const control = this.eventDataForm.get(key);
      control.markAsTouched();
      control.markAsDirty();
    });
    this.eventDataForm.updateValueAndValidity();
    if (!this.eventDataForm.valid) {
      return;
    }
    this.modal.dismissAll();
    this.addEvent();
  }

  addEvent(): void {
    const eventDto = {} as EventDto;
    eventDto.color = StaticDataCalendar.EVENT_COLORS.find(item => item.name === this.eventType);
    eventDto.title = this.eventDataForm.controls['title'].value;
    eventDto.start = new Date(this.currentDay.getTime());
    eventDto.start.setHours(this.eventDataForm.value.startTime.hour);
    eventDto.start.setMinutes(this.eventDataForm.value.startTime.minute);

    eventDto.end = new Date(this.currentDay.getTime());
    eventDto.end.setHours(this.eventDataForm.value.endTime.hour);
    eventDto.end.setMinutes(this.eventDataForm.value.endTime.minute);

    this.service.addEvent(eventDto);
  }


}
