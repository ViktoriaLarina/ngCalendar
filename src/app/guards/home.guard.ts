import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Routs} from "@shared/enums/routs";

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    if (!localStorage.getItem('login')) {
      this.router.navigate([`/${Routs.LOGIN}`]);
      return false;
    } else {
      return true;
    }
  }
}

