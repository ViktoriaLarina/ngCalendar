import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Routs} from "@shared/enums/routs";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    if (localStorage.getItem('login')) {
      this.router.navigate([`/${Routs.HOME}`]);
      return false;
    } else {
      return true;
    }
  }
}
