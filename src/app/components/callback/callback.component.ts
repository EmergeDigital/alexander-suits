import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  isAuthenticated: boolean;
  user: any;
  hasRun: boolean;

  constructor(public auth: AuthService, public data: DataService) {
    this.hasRun = false;
    this.isAuthenticated = auth.isAuthenticated();

    if(this.isAuthenticated) {
      auth.getCurrentUser(null).then(u => {
        this.user = u;
        this.checkAuth();
      });
    }

    auth._authenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      auth.getCurrentUser(null).then(u => {
        this.user = u;
        this.checkAuth();
      });
    });

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

  checkAuth() {
    if(this.user && !this.hasRun){
      this.hasRun = true;
      this.data.getUser(this.user.id).then((user)=>{
        if(user !== "does_not_exist") {
          //Do stuff
          // console.log(user);
          //Restore session etc?
        } else {
          // console.log(this.user);
          console.log("CREATING ACCOUNT");
          this.data.createUser(this.user.id, this.user.email).then(response=>{
            // console.log(response);
            //Restore session etc?
          });
        }
      }, (err) => {
        console.log("Error getting user: " + err);
      });
    }
    return;
  }

}
