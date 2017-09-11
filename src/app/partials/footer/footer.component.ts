import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import {AuthService} from '../../services/auth.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input('appTitle') appTitle: string;
  cell: string;
  isAuthenticated: boolean;
  emailNewsletter: string;
  showNewsletter: boolean;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public auth: AuthService) {
      if (this.appTitle === undefined) {
          this.appTitle = 'Unspecified';
      }
      this.cell = "011 492 33604";
      this.isAuthenticated = auth.isAuthenticated();

      auth._authenticated.subscribe(isAuthenticated => {
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

  signUpNewsletter() {
    this.emailNewsletter = "";
    this.showNewsletter = false;
    var toastOptions:ToastOptions = {
      title: "Success",
      msg: "You will now be eternally spammed"
    };
    this.toastyService.success(toastOptions);
  }

  login(): void {
      this.auth.login();
  }

  // doesNothing() {
  //   this.snackBar.open("This does nothing at the moment!", "", {  duration: 2000   });
  // }
}
