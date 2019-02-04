import {Component, OnInit} from '@angular/core';
import {InteractionService} from "@services/interaction.service";
import {AlertDataModel} from "@shared/models/alert-data.model";
import {Subject} from "rxjs/index";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  showAlert = new Subject<AlertDataModel>();

  constructor(private service: InteractionService) {
  }

  ngOnInit(): void {
    this.service.alert.subscribe((data: AlertDataModel) => {
     if (data) {
       this.showAlert.next(data);
     }
    });
  }


}
