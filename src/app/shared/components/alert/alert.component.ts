import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {AlertDataModel} from "@shared/models/alert-data.model";
import {Subject, Subscription} from "rxjs/index";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() show: Subject<AlertDataModel>;
  @ViewChild("content") private alertTemplate: TemplateRef<any>;
  data: AlertDataModel;

  constructor(private modal: NgbModal) {
  }

  ngOnInit() {
   this.show.subscribe(data => this.open(data));
  }

  open(data: AlertDataModel) {
    this.data = data;
      this.modal.open(this.alertTemplate, {ariaLabelledBy: 'modal-basic-title'});
      setTimeout(() => this.modal.dismissAll(), data.waiting_time);
  }

}
