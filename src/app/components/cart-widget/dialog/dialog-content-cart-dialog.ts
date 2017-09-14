import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {Cart} from "../../../models/cart";
import {Product} from "../../../models/product";
import { Router } from '@angular/router';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-dialog-content-cart-dialog',
  templateUrl: './dialog-content-cart-dialog.html',
  styleUrls: ['./dialog-content-cart-dialog.scss']
})
export class DialogContentCartDialog implements OnInit {

  numbers: any[];
  changedNumbers: any;
  cart: Cart;
  dataService: any;
  loadingToast: any;
  isLoading: boolean;


  //TODO:
  //  -  onChange method for count
  //  -  import data service & replace cart data when updated
  //  -  clear cart function
  //  -  checkout button (does nothing for now)
  //  -  cart total at bottom of products

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public router: Router, private toastyService:ToastyService, private toastyConfig: ToastyConfig) {
    this.isLoading = false;
    let numbers = [];
    for(let i = 1; i < 21; i++) {
      numbers.push(i);
    }
    this.numbers = numbers;
    this.cart = data.cart;
    this.dataService = data.dataService;
  }

  ngOnInit() {
  }

  onChange(t){
    if(this.loadingToast == null) {
      this.isLoading = true;
    // this.dataService.getCart().then(cart => {
    //   for(let product of cart.products) {
    //     if(t.product_SKU == product.product_SKU) {
    //       let old_could =
    //       console.log(product.count + " VS " + t.count);
    //     }
    //   }
    // })
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

      let subtotal = this.cart.total;
      for (let product of this.cart.products) {
        if(product.product_SKU != t.product_SKU) {
          subtotal -= product.count * product.price;
        }
      }
      let new_subtotal = t.price * t.count;
      console.log("OLD SUBTOTAL OF PRODUCT " + subtotal);
      console.log("NEW SUBTOTAL OF PRODUCT " + new_subtotal);
      let old_count = subtotal / t.price;
      console.log("OLD COUNT OF PRODUCT " + old_count);
      let diff = t.count - old_count;
      this.addCart(t, diff);

    } else {
      this.pleaseWait();
    }
    //Fire event to data service:
    //product id & new count
    //data service compares count of current product, then adds the difference to the cart
  }

  pleaseWait() {
    var toastOptions:ToastOptions = {
      title: "Please wait",
      msg: "Cart is busy loading"
    };

    this.toastyService.warning(toastOptions);
  }

  addCart(product, count) {

      let _product = {
        id: product.product_SKU,
        price: product.price,
        name: product.name,
        description: product.description,
        category: product.category,
        extras: product.extras,
        image_urls: product.image_urls,
        count: count
      };
      this.dataService.addToCart([_product]).then((cart)=>{
        if(!!cart.products && cart.products.length > 0) {
          this.cart = cart;
        } else {
            this.cart = null;
        }
        this.updateSuccess("Cart has been updated");
      })

  }

  deleteCart() {
    if(this.loadingToast == null) {
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

      this.dataService.deleteCart().then((response)=>{
        if(response === "success") {
          this.cart = null;
          this.updateSuccess("Cart has been cleared");
        }
      })
    } else {
      this.pleaseWait();
    }
  }

  removeItem(product) {
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
      id: product.product_SKU,
      price: product.price,
      name: product.name,
      description: product.description,
      category: product.category,
      extras: product.extras,
      image_urls: product.image_urls,
      count: product.count * -1
    };

    this.dataService.addToCart([_product]).then((cart)=>{
      if(!!cart.products && cart.products.length > 0) {
        this.cart = cart;
      } else {
          this.cart = null;
      }
      this.updateSuccess("Cart has been updated");
    })
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

  checkout() {
    this.router.navigate(['/checkout']);
  }

//TODO: Replace this with a route change and update accordingly (dataService -> data)

}
