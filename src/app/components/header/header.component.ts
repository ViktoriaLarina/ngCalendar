import {Component, OnInit} from '@angular/core';
import {Routs} from '@shared/enums/routs';
import {LoginService} from '@services/login.service';
import {RoutingModel} from '@shared/models/routing.model';
import {StaticData} from '@shared/staticData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  homePath: string;
  linksForNav: RoutingModel[];

  constructor(private service: LoginService) {
  }

  ngOnInit() {
    this.homePath = Routs.HOME.toString();
    this.linksForNav = StaticData.childRouts;
  }

  logout(): void {
    this.service.removeLogin();
  }

}
