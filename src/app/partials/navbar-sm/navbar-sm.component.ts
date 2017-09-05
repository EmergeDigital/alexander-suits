import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar-sm',
  templateUrl: './navbar-sm.component.html',
  styleUrls: ['./navbar-sm.component.scss']
})
export class NavbarSmComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(public auth: AuthService) {

      this.isAuthenticated = auth.isAuthenticated();
      console.log(this.isAuthenticated);

      auth._authenticated.subscribe(isAuthenticated => {
        console.log(isAuthenticated);
        this.isAuthenticated = isAuthenticated;
      });
  }

  ngOnInit() {

  }

  login(): void {
      this.auth.login();
  }

  logout(): void {
      this.auth.logout();
  }

}
