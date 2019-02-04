import { Injectable } from '@angular/core';
import {Subject} from "rxjs/index";
import {AlertDataModel} from "@shared/models/alert-data.model";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  alert = new Subject<AlertDataModel>();

  constructor() { }
}
