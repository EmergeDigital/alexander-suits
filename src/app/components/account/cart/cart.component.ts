import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';
import {Product} from "../../../models/product";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Product[];

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public data: DataService, public auth: AuthService, public router: Router) {

      data.getProducts().then((products)=>{
        this.products = products;
      });
  }

  ngOnInit() {
  }

  addCart(product) {
    let _product = {
      id: product.id,
      count: 1
    };
    this.data.addToCart([_product]).then((response)=>{
      console.log(response);
    })
  }

  deleteCart() {
    this.data.deleteCart().then((response)=>{
      console.log(response);      
    })
  }

}
