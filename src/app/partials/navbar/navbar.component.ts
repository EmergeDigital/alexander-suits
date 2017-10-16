import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import {AuthService} from '../../services/auth.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Input('appTitle') appTitle: string;
    cell: string;
    isAuthenticated: boolean;

    constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public auth: AuthService) {
        if (this.appTitle === undefined) {
            this.appTitle = 'Unspecified';
        }
        this.cell = "011 492 33604";
        this.isAuthenticated = auth.isAuthenticated();
        // console.log(this.isAuthenticated);

        auth._authenticated.subscribe(isAuthenticated => {
          // console.log(isAuthenticated);
          this.isAuthenticated = isAuthenticated;
        });
    }

    ngOnInit() {

    }

    copied() {
      var toastOptions:ToastOptions = {
        title: "Success",
        msg: "Copied to clipboard"
      };
      this.toastyService.success(toastOptions);
    }

    login(): void {
        this.auth.login();
    }

    logout(): void {
        this.auth.logout();
    }

}
