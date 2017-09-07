import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-content-cart-dialog',
  templateUrl: './dialog-content-cart-dialog.html',
  styleUrls: ['./dialog-content-cart-dialog.scss']
})
export class DialogContentCartDialog implements OnInit {

  numbers: any[];
  changedNumbers: any;

  //TODO:
  //  -  onChange method for count
  //  -  import data service & replace cart data when updated
  //  -  clear cart function
  //  -  checkout button (does nothing for now)
  //  -  cart total at bottom of products

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    let numbers = [];
    for(let i = 1; i < 21; i++) {
      numbers.push(i);
    }
    this.numbers = numbers;
  }

  ngOnInit() {
  }

  onChange(t){
    console.log(t);
    //Fire event to data service:
    //product id & new count
    //data service compares count of current product, then adds the difference to the cart
  }
}
