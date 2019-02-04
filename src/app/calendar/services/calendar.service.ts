import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {CalendarEvent} from "calendar-utils";
import {EventDto} from "@shared/models/eventDto.model";
import {BASE_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  eventsList = new BehaviorSubject<CalendarEvent[]>([]);

  constructor(@Inject(BASE_URL) private baseUrl: string,
              private http: HttpClient) {
  }

  getEventList(): void {
    const url = `${this.baseUrl}/events`;
    this.http.get(url).subscribe((data: EventDto[]) => {
      const events = data.map(item => {
        const event = item as CalendarEvent;
        event.start = new Date(item.start);
        event.end = new Date(item.end);
        return event;
      });
      this.eventsList.next(events);
    });
  }

  deleteEvent(id: string | number) {
    const url = `${this.baseUrl}/event/${id}`;
    this.http.delete(url)
      .subscribe((res) => {
        this.eventsList.next(this.eventsList.value.filter(item => item.id != id));
        this.getEventList();
      });
  }

  addEvent(data: EventDto) {
    const url = `${this.baseUrl}/event`;
    this.http.post(url, data)
      .subscribe((res) => {
        this.eventsList.next([...this.eventsList.value, data]);
        this.getEventList();
      });
  }

  sendImage(imgData: any, day: any) {
    // console.log(imgData);
    // console.log(day);
    //
    // const fileToSend = new FormData();
    // fileToSend.append('file', imgData);
    // const dto = {
    //   file: fileToSend,
    //   day: day
    // };
    // const url = `${this.baseUrl}/eventImages`;
    // this.http.post(url, dto)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }


}
