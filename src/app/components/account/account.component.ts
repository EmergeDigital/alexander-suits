import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {User} from "../../models/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  tiles: any[];
  current_user: User;

  constructor(public router: Router, public auth: AuthService, data: DataService) {
    this.tiles = [
      {
        color: "#ff7961",
        text: "Orders"
      },
      {
        color: "#d05ce3",
        text: "Cart"
      },
      {
        color: "#757de8",
        text: "Checkout"
      },
      {
        color: "#67daff",
        text: "Settings"
      },
      {
        color: "#52c7b8",
        text: "Measurements"
      },
      {
        color: "#ffc947",
        text: "Log Out"
      },
    ];
    if(auth.isAuthenticated()){
      if(data.hasLoaded()) {
        let id = data.getCurrentUser;
        data.getUser(id).then((user)=>{
          this.current_user = user;
        });
      } else {
        data.user_loaded.subscribe(user => {
          this.current_user = user;
        });
      }

    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  thisWorks(text) {
    console.log("THIS WORKS " + text);
  }

  tilesLink(text){
    switch (text) {
      case "Orders":
        this.router.navigate(['/account/orders']);
        break;
      case "Cart":
        this.router.navigate(['cart']);
        break;
      case "Checkout":
        // console.log("DOES NOTHING");
        this.router.navigate(['/checkout']);
        break;
      case "Settings":
        this.router.navigate(['/account/settings']);
        break;
      case "Measurements":
        console.log("DOES NOTHING");
        // this.router.navigate(['/account/orders']);
        break;
      case "Log Out":
        this.auth.logout();
        break;

    }
  }

}
