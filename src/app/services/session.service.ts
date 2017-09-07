import { Injectable, EventEmitter } from '@angular/core';
import {Cart} from "../models/cart";

@Injectable()
export class SessionService {

  constructor() { }

  setLocalCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getLocalCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

}
