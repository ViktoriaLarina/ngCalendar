import {EventType} from "@shared/enums/event-type";
import {EventTypeModel} from "@shared/models/event-type.model";
import {EventColorModel} from "@shared/models/event-color.model";
import {TimeModel} from "@shared/models/time.model";

export class StaticDataCalendar {

  static EVENT_TYPES: EventTypeModel[] = [
    {
      value: EventType.PARTY,
      title: 'Fun',
      isDefault: false
    },
    {
      value: EventType.REST,
      title: 'Job',
      isDefault: false
    },
    {
      value: EventType.MEETING,
      title: 'Other',
      isDefault: true
    }
  ];

  static EVENT_COLORS: EventColorModel[] = [
    {
      name: EventType.PARTY,
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    {
      name: EventType.REST,
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    {
      name: EventType.MEETING,
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  ];

  static START_EVENT_TIME: TimeModel = {
    hour: 10,
    minute: 30
  };

  static END_EVENT_TYPE: TimeModel = {
    hour: 11,
    minute: 20
  };

}
