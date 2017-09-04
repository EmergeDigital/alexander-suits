import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  app_name = 'Alexander Suits';

  constructor(public auth: AuthService) {
        auth.handleAuthentication();

        // if (environment.useAuth) {
        //     if (!auth.isAuthenticated()) {
        //         // If the user is not authenticated go to the login screen.
        //         auth.logout();
        //
        //         auth.handleAuthentication();
        //         // auth.handleAuthenticationWithHash();
        //         auth.login();
        //     }
        // }

        this.title = 'app works!';
        this.app_name = 'Angularifier';
    }

    logout(): void {
      //  this.auth.logout();
    }

    login(): void {
        this.auth.login();
    }
}
