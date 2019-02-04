import {EventType} from "../enums/event-type";

export interface EventTypeModel {
  value: EventType;
  title: string;
  isDefault: boolean;
}
