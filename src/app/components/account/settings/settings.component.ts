import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';
import {User} from "../../../models/user";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  provinces: any[];
  current_user: User;
  isLoading: boolean;
  current_province: any;
  loadingToast: any;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public data: DataService, public auth: AuthService, public router: Router) {
    this.isLoading = true;
    this.toastyConfig.theme = 'material';
    this.provinces = [
      {
        viewValue: "Eastern Cape"
      },
      {
        viewValue: "Free State"
      },
      {
        viewValue: "Gauteng"
      },
      {
        viewValue: "KwaZulu-Natal"
      },
      {
        viewValue: "Limpopo"
      },
      {
        viewValue: "Mpumalanga"
      },
      {
        viewValue: "North West"
      },
      {
        viewValue: "Northern Cape"
      },
      {
        viewValue: "Western Cape"
      }
    ];

    if(auth.isAuthenticated()){
      if(data.hasLoaded()) {
        let id = data.getCurrentUser;
        data.getUser(id).then((user)=>{
          this.isLoading = false;
          this.current_user = user;
        });
      } else {
        data.user_loaded.subscribe(user => {
          console.log("LOADED");
          this.isLoading = false;
          this.current_user = user;
        });
      }

    } else {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
  }

  updateUser() {
    // console.log(this.current_user);
    var toastOptions:ToastOptions = {
      title: "Updating Your Account",
      msg: "Please wait",
      timeout: 60000,
      showClose: false,
      onAdd: (toast: ToastData) => {
        this.loadingToast = toast.id;
      }
    };

    this.toastyService.wait(toastOptions);

    this.data.setUser(this.current_user).then((response)=>{
      if(response[0].user_id) {
        this.updateSuccess();
      }
    })
  }

  updateSuccess() {
     this.toastyService.clear(this.loadingToast);
     this.loadingToast = null;

     var toastOptions:ToastOptions = {
       title: "Success",
       msg: "Account has been updated"
     };

     this.toastyService.success(toastOptions);
     //For now, do not rebuild session
    //  this.router.navigate(['/']);
  }

}
