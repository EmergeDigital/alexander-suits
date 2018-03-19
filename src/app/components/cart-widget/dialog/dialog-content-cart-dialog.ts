import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Cart} from "../../../models/cart";
import {Product} from "../../../models/product";
import { Router } from '@angular/router';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { UUID } from 'angular2-uuid';

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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public toastyService:ToastyService, public toastyConfig: ToastyConfig) {
    this.isLoading = false;
    let numbers = [];
    for(let i = 1; i < 21; i++) {
      numbers.push(i);
    }
    this.numbers = numbers;
    
    this.processCart(data.cart);
    this.dataService = data.dataService;
  }

  ngOnInit() {
  }

  getBg(product) {
    return {'background-image': 'url(' + product.image_urls[0] + ')', 'background-size': 'cover'};
  }

  getImage(product) {
    if(!!product.image_urls && product.image_urls.length > 2) {
      if(this.isValidUrl(product.image_urls[2])) {
        
        return product.image_urls[2];
      }
    }
    return 'assets/casual-suit.png';
  }

  isValidUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
  }

  onChange(t){
    if(this.loadingToast == null) {
      this.isLoading = true;
      
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

      
      let diff = t.count - t.old_count;
      let _t = t;
      delete _t['uuid'];
      delete _t['old_count'];
      console.log("ADDING: ",  _t, diff)

      //Fire event to data service
      //data service compares count of current product, then adds the difference to the cart
      this.addCart(_t, diff);

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

  processCart(cart) {
    if(!!cart && !!cart.products && cart.products.length > 0) {
      for(let p of cart.products) {
        p.uuid = UUID.UUID();
        p.old_count = p.count;
      }
    }
    this.cart = cart;
    console.log("PROCESSED", this.cart);
  }

  addCart(product, count) {

      let _product = {
        id: product.product_SKU,
        price: product.price,
        name: product.name,
        description: product.description,
        category: product.category,
        extras: product.extras,
        extra_products: product.extra_products,
        image_urls: product.image_urls,
        count: count
      };
      delete _product['uuid'];
      delete _product['old_count'];

      console.log(_product);

      this.dataService.UpdateCart([_product]).then((cart)=>{
        if(!!cart.products && cart.products.length > 0) {
          this.processCart(cart);
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
      extra_products: product.extra_products,
      image_urls: product.image_urls,
      count: product.old_count * -1
    };
    delete _product['uuid'];
    delete _product['old_count'];

    console.log(_product);

    this.dataService.UpdateCart([_product]).then((cart)=>{
      if(!!cart.products && cart.products.length > 0) {
        this.processCart(cart);  
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
