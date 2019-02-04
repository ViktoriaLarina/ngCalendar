import {RoutingModel} from "./models/routing.model";
import {ItemRouts} from "./enums/routs";
import {AlertDataModel} from "@shared/models/alert-data.model";

export class StaticData {

  static  MAX_SIZE_FILE = 2000;
  static WAITING_ALERT_TIME = 3000;

  static ALERT_DATA_IMG_SIZE: AlertDataModel = {
    title: 'Warning!',
    message: `to big img size! max size ${ ( StaticData.MAX_SIZE_FILE / 1024) / 1024} Mb`,
    waiting_time: StaticData.WAITING_ALERT_TIME
  };

  static ALERT_DATA_IMG_FORMAT: AlertDataModel = {
    title: 'Warning!',
    message: 'only images jpeg and png',
    waiting_time: StaticData.WAITING_ALERT_TIME
  };

  static childRouts: RoutingModel[] = [
    {
      title: 'Calendar',
      path: ItemRouts.CALENDAR
    },
    {
      title: 'Document',
      path: ItemRouts.DOCUMENT
    },
    {
      title: 'Notes',
      path: ItemRouts.NOTES
    },
    {
      title: 'Tasks',
      path: ItemRouts.TASKS
    }
  ];

}
