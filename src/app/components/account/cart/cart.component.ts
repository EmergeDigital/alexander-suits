import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';
import {Product} from "../../../models/product";
import {Cart} from "../../../models/cart";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Product[];
  cart: Cart;
  loadingToast: any;
  loadingCart: boolean;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public data: DataService, public auth: AuthService, public router: Router) {

    this.loadingToast = null;
    this.loadingCart = true;

    // if(auth.isAuthenticated()){
    //   if(data.hasLoaded()) {
    //     data.getProducts().then((products)=>{
    //       this.products = products;
    //     });
    //     data.getCart().then((cart)=>{
    //       if (cart.status === "does_not_exist") {
    //
    //       } else {
    //         this.cart = cart;
    //       }
    //     });
    //   } else {
    //
    //     data.user_loaded.subscribe(user => {
    //       data.getProducts().then((products)=>{
    //         this.products = products;
    //       });
    //       data.getCart().then((cart)=>{
    //         if (cart.status === "does_not_exist") {
    //
    //         } else {
    //           this.cart = cart;
    //         }
    //       });
    //     });
    //   }
    //
    // } else {
    //   this.router.navigate(['/']);
    // }
      data.findCart().then(cart=> {
        if (cart.status === "does_not_exist") {
          console.log("No Cart Detected");
          this.loadingCart = false;
        } else {
          if(!!cart.products) {
            this.cart = cart;
            console.log(cart);
            this.loadingCart = false;
          } else {
              console.log("No Cart Detected");
              this.loadingCart = false;
          }
        }
      })
      data.getProducts().then((products)=>{
        this.products = products;
      });
  }

  ngOnInit() {
  }

  addCart(product) {
    if(this.loadingToast == null && !this.loadingCart) {
      var toastOptions:ToastOptions = {
        title: "Updating Your Cart",
        msg: "Please wait",
        timeout: 60000,
        showClose: false,
        onAdd: (toast: ToastData) => {
          this.loadingToast = toast.id;
        }
      };

      this.toastyService.wait(toastOptions);

      let _product = {
        id: product.id,
        price: product.price,
        name: product.name,
        description: product.description,
        category: product.category,
        extras: product.extras,
        image_urls: product.image_urls,
        count: 1
      };
      this.data.addToCart([_product]).then((cart)=>{
        this.cart = cart;
        this.updateSuccess("Cart has been updated");
      })
    } else {
      this.pleaseWait();
    }
  }

  deleteCart() {
    if(this.loadingToast == null && !this.loadingCart) {
      var toastOptions:ToastOptions = {
        title: "Updating Your Cart",
        msg: "Please wait",
        timeout: 60000,
        showClose: false,
        onAdd: (toast: ToastData) => {
          this.loadingToast = toast.id;
        }
      };

      this.toastyService.wait(toastOptions);

      this.data.deleteCart().then((response)=>{
        if(response === "success") {
          this.cart = null;
          this.updateSuccess("Cart has been cleared");
        }
      })
    } else {
      this.pleaseWait();
    }
  }

  pleaseWait() {
    var toastOptions:ToastOptions = {
      title: "Please wait",
      msg: "Cart is busy loading"
    };

    this.toastyService.warning(toastOptions);
  }

  updateSuccess(message) {
     this.toastyService.clear(this.loadingToast);
     this.loadingToast = null;

     var toastOptions:ToastOptions = {
       title: "Success",
       msg: message
     };

     this.toastyService.success(toastOptions);
     //For now, do not rebuild session
    //  this.router.navigate(['/']);
  }

}
