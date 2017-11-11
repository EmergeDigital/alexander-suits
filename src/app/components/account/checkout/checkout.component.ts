import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {AuthService} from '../../../services/auth.service';
import {SessionService} from '../../../services/session.service';
import { Router } from '@angular/router';
import {Product} from "../../../models/product";
import {Cart} from "../../../models/cart";
import {User} from "../../../models/user";
import {MatDialog} from '@angular/material';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {MeasurementsService} from "../../../services/customizers/measurements.service";

@Component({
  selector: 'app-checkout-main',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutMainComponent implements OnInit {

  provinces: any[];
  current_user: User;
  cart: Cart;
  loadingToast: any;
  loadingCart: boolean;
  isLoading: boolean;
  authenticated: boolean;
  stepsLength: number;
  steps: any[];
  completedSteps: any[];
  shippingMethods: any[];
  shippingMethod: string;
  useAddress: boolean;
  alt_address: any;
  delivery_instructions: string;
  instructions: string;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public data: DataService, public auth: AuthService, 
    public router: Router, public session: SessionService, public measurementsService: MeasurementsService) {

    this.steps = [];
    this.completedSteps = [];
    this.stepsLength = 4;
    this.steps.push({display: "block"});
    this.completedSteps.push(false);
    for(let i = 1; i < this.stepsLength; i++) {
      this.steps.push({display: "none"});
      this.completedSteps.push(false);
    }

    this.authenticated = auth.isAuthenticated();

    if(this.authenticated) {
      this.loadUser();
    }

    this.loadingCart = true;
    this.loadCart();

    auth._authenticated.subscribe(authenticated => {
      this.authenticated = authenticated;
      this.data.switchCarts(authenticated);
      if(authenticated === false) {
        this.changeStep(0);
      } else {
        this.loadUser();
      }
    })

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

    this.shippingMethods = [
      "DHL Delivery",
      "Pickup from us",
      "Other"
    ];

    this.shippingMethod = '';
    this.useAddress = true;
    this.alt_address = {};
  }

  loadUser() {
    if(this.data.hasLoaded()) {
      let id = this.data.getCurrentUser;
      this.data.getUser(id).then((user)=>{
        this.current_user = user;
      });
    } else {
      this.data.user_loaded.subscribe(user => {
        this.current_user = user;
      });
    }
  }

  loadCart() {
    this.data.findCart().then(cart=> {
      if (cart.status === "does_not_exist") {
        this.loadingCart = false;
      } else {
        if(!!cart.products && cart.products.length > 0) {
          this.cart = cart;
          this.loadingCart = false;
        } else {
            this.cart = null;
            this.loadingCart = false;
        }
      }

      this.data._cartUpdating.subscribe(loading=>{
        this.loadingCart = loading;
      })

      this.data._cartUpdated.subscribe(cart=>{
        if(!!cart) {
          if (cart.status === "does_not_exist") {
            this.cart = null;
            this.loadingCart = false;
          } else {
            if(!!cart.products && cart.products.length > 0) {
              this.cart = cart;
              this.loadingCart = false;
            } else {
                this.cart = null;
                this.loadingCart = false;
            }
          }
        } else {
            this.cart = null;
            this.loadingCart = false;
        }
      })
    });
  }

  toastError(title, msg) {
    var toastOptions:ToastOptions = {
      title: title,
      msg: msg
    };

    this.toastyService.warning(toastOptions);
  }

  iterateStep(s) {
    this.completedSteps[s-1] = true;
    this.changeStep(s);
  }

  changeStep(s){
    if(s > 0) {
      if(this.auth.isAuthenticated() === false){
        this.toastError("Please log in", "You need to log in to continue");
        return;
      }

      if(this.loadingCart === true || this.loadingToast === true) {
        this.toastError("Please wait", "Cart is busy loading");
        return;
      }

      if(!(!!this.cart) || this.cart.products.length === 0 || !(!!this.cart.products)) {
        this.toastError("Cart is empty", "Please put items in your cart to continue");
        return;
      }

      if(this.completedSteps[s-1] === false){
        this.toastError("Complete previous step", "Please confirm completion of previous step(s) to continue");
        return;
      }
    }
    for(let step of this.steps) {
      step.display = "none";
    }

    this.steps[s].display = 'block';
  }

  calcShippingCosts(): any {
    if(!!this.cart) {
      if(!!this.current_user) {
        if(this.useAddress && this.current_user.country !== "South Africa") {
          return 160 + ".00 (Out of SA)";
        } else if(!this.useAddress && this.alt_address.country  !== "South Africa") {
          return 160 + ".00 (Out of SA)";
        }
      }
      let shirtcount = 0;
      for(const p of this.cart.products) {
        if(p.category === "Suit") {
          return 160 + "(Suit)";
        } else if(p.category === "Shirt") {
          if(p.count > 1) {
            return 160 + ".00 (2+ Shirts)";
          }
          shirtcount++;
        }
      }
      if(shirtcount > 1) {
        return 160 + ".00 (2+ Shirts)";
      }
      return 75 + ".00"; 
    }
    return 0 + ".00 (FREE)";
  }

  checkout() {
    if(this.loadingToast == null) {
      var toastOptions:ToastOptions = {
        title: "Checking you out",
        msg: "Please wait",
        timeout: 60000,
        showClose: false,
        onAdd: (toast: ToastData) => {
          this.loadingToast = toast.id;
        }
      };
      this.toastyService.wait(toastOptions);

      let addressObj = {};
      let deliveryObj = {};
      let userObj = {};
      let user = this.current_user;
      switch (this.shippingMethod) {
        case "DHL Delivery":
        console.log("DHL");
          deliveryObj = {
            method: "DHL",
            delivery_instructions: this.delivery_instructions
          };
          if(!this.useAddress) {
            addressObj = {
              addressL1: this.alt_address.address,
              addressL2: this.alt_address.address2,
              city: this.alt_address.city,
              province: this.alt_address.province,
              postal_code: this.alt_address.postal_code,
              country: this.alt_address.country
            };
            console.log(addressObj);
          } else {
          console.log("HOME");
            addressObj = {
              addressL1: user.address,
              addressL2: user.address2,
              city: user.city,
              province: user.province,
              postal_code: user.postal_code,
              country: user.country
            };
            console.log(addressObj);
          }
          break;
        case "Pickup from us":
          deliveryObj = {
            method: "Pickup"
          };
          break;
        case "Other":
          deliveryObj = {
            method: "Other",
            delivery_instructions: this.instructions
          };
          break;
      }

      userObj = {
        name: user.fullname,
        measurements: this.measurementsService.measurements
      };

      let current_user = user;
      current_user.measurements = this.measurementsService.measurements;

      this.data.setUser(current_user).then(result => {
        let cart_data = {
          user_data: userObj,
          address_data: addressObj,
          delivery_data: deliveryObj,
          contact_number: user.contact_mobile,
          contact_email: user.email,
          comments: [this.measurementsService.comments]
        };
        this.data.checkout(cart_data).then(order=>{
          console.log(order);
          this.session.storeOrder(order);
          if(!!order) {
            this.data.deleteCart().then((response)=>{
              if(response === "success") {
                this.cart = null;
              }
              this.updateSuccess("Order created");
              this.router.navigate(['/payment']);
              //Navigate to next page
            })
          }
        })
      }).catch(ex => {
        this.toastError("There was an error", ex);
      })

    }
  }

  updateSuccess(message) {
     this.toastyService.clear(this.loadingToast);
     this.loadingToast = null;
     this.isLoading = false;

     var toastOptions:ToastOptions = {
       title: "Success",
       msg: message
     };

     this.toastyService.success(toastOptions);
     //For now, do not rebuild session
    //  this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
