import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../../services/auth.service';
// import {DataService} from '../../services/data.service';
// import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  // isAuthenticated: boolean;
  // user: any;
  // hasRun: boolean;

  constructor() {
    // this.toastyConfig.theme = 'material';
    // this.hasRun = false;
    // this.isAuthenticated = auth.isAuthenticated();
    //
    // if(this.isAuthenticated) {
    //   auth.getCurrentUser(null).then(u => {
    //     this.user = u;
    //     this.checkAuth();
    //   });
    // }
    //
    // auth._authenticated.subscribe(isAuthenticated => {
    //   this.isAuthenticated = isAuthenticated;
    //   auth.getCurrentUser(null).then(u => {
    //     this.user = u;
    //     this.checkAuth();
    //   });
    // });

    // auth.getCurrentUser().then(u => {
    //   this.user = u;
    //   this.checkAuth();
    // });
    //
    // auth._user.subscribe(user => {
    //   auth.getCurrentUser().then(u => {
    //     this.user = u;
    //     this.checkAuth();
    //   });
    // });

  }

  ngOnInit() {
  }



}
