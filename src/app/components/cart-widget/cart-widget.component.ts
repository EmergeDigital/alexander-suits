import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {Product} from "../../models/product";
import {Cart} from "../../models/cart";
import {MatDialog} from '@angular/material';
import {DialogContentCartDialog} from './dialog/dialog-content-cart-dialog';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.scss']
})
export class CartWidgetComponent implements OnInit {

  products: Product[];
  cart: Cart;
  loadingToast: any;
  loadingCart: boolean;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public data: DataService, public auth: AuthService, public router: Router, public dialog: MatDialog) {

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
      this.loadCart();

      auth._authenticated.subscribe(authenticated => {
        if(authenticated) {
          console.log("AUTHENTICATED");

        } else {
          console.log("UNAUTHENTICATED");

        }
        this.data.switchCarts(authenticated);
      })


      // data.getProducts().then((products)=>{
      //   this.products = products;
      // });
  }

  loadCart() {
    this.data.findCart().then(cart=> {
      if (cart.status === "does_not_exist") {
        console.log("No Cart Detected");
        this.loadingCart = false;
      } else {
        if(!!cart.products && cart.products.length > 0) {
          this.cart = cart;
          console.log(cart);
          this.loadingCart = false;
        } else {
            this.cart = null;
            console.log("No Cart Detected");
            this.loadingCart = false;
        }
      }

      this.data._cartUpdating.subscribe(loading=>{
        this.loadingCart = loading;
      })

      this.data._cartUpdated.subscribe(cart=>{
        console.log("UPDATED CART");
        if(!!cart) {
          if (cart.status === "does_not_exist") {
            console.log("No Cart Detected");
            this.cart = null;
            this.loadingCart = false;
          } else {
            if(!!cart.products && cart.products.length > 0) {
              this.cart = cart;
              console.log(cart);
              this.loadingCart = false;
            } else {
                console.log("No Cart Detected");
                this.cart = null;
                this.loadingCart = false;
            }
          }
        } else {
            console.log("Cart has been emptied");
            this.cart = null;
            this.loadingCart = false;
        }
      })
    });
  }

  openDialog() {
    if(this.loadingToast == null && !this.loadingCart) {
      const dialogRef = this.dialog.open(DialogContentCartDialog, {
        data: {
          cart: this.cart,
          dataService:  this.data
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
     this.pleaseWait();
   }
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
      this.data.UpdateCart([_product]).then((cart)=>{
        // this.cart = cart;
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
          // this.cart = null;
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
