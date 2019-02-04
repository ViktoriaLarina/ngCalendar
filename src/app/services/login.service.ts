import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../config';
import {Routs} from "@shared/enums/routs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {
  }

  saveLogin(login: string): void {
    const url = `${this.baseUrl}/login`;
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
    });
    localStorage.setItem('login', login);
    this.changeRout(`/${Routs.HOME}`);
  }

  removeLogin(): void {
    if (localStorage.getItem('login')) {
      localStorage.removeItem('login');
      this.changeRout(`/${Routs.LOGIN}`);
    }
  }

  private changeRout(rout: string): void {
    this.router.navigate([rout]);
  }
}
