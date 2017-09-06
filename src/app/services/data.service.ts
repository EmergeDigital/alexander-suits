import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, HttpModule} from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/toPromise';

import {User} from "../models/user";
import {Product} from "../models/product";
import {Cart} from "../models/cart";

@Injectable()
export class DataService {

    API_URL: string;

    current_user: User;
    current_cart: Cart;
    product_list: Product[];
    user_id: string;
    user_loaded: EventEmitter<User> = new EventEmitter();
    has_loaded: boolean;
    // user: any;

    constructor(public auth: AuthService, public http: Http, public authHttp: AuthHttp) {
        this.API_URL = "http://localhost:1337";
    }

    setupDatabase(): void {

    }

    hasLoaded() {
      return this.has_loaded;
    }


    /* ==============  USER  ============== */

    setCurrentUser(id) {
      this.user_id = id;
    }

    getCurrentUser() {
      return this.user_id;
    }

    getUser(id): Promise<User> {
        return new Promise((resolve, reject) => {
          if (!!this.current_user) {
              resolve(this.current_user);
          } else {
            let params = {
              user_id: id
            };
            this.authHttp.get(this.API_URL + "/api/user", {params: params}).toPromise().then(user => {
                const _user = user.json();
                this.current_user = _user;
                this.setCurrentUser(id);
                this.user_loaded.emit(_user);
                this.has_loaded = true;
                resolve(_user);
            }).catch(ex => {
                reject(ex);
            });
          }
        });
    }

    setUser(user): Promise<User> {
        return new Promise((resolve, reject) => {
            this.authHttp.post(this.API_URL + "/api/users/update", user).toPromise().then(user => {
                const _user = user.json();
                resolve(_user);
            }).catch(ex => {
                reject(ex);
            });
        });
    }

    createUser(id, email): Promise<User> {
      return new Promise((resolve, reject) => {
          let body = {
            'user_id': id + "",
            'email': email + ""
          };
          this.authHttp.post(this.API_URL + "/api/users/create", body).toPromise().then(user => {
              const _user = user.json();
              this.current_user = _user;
              resolve(_user);
          }).catch(ex => {
              reject(ex);
          });

      });
    }


    /* ==============  PRODUCTS  ============== */

    getProducts(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            if (!!this.product_list) {
                resolve(this.product_list);
            } else {
                console.log(localStorage.getItem('access_token'));
                console.log(localStorage.getItem('id_token'));
                console.log(localStorage.getItem('expires_at'));
                let options =
                this.authHttp.get(this.API_URL + "/api/products/all").toPromise().then(products => {
                    const got_products = products.json();
                    const temp_arr = [];
                    for (const product of got_products) {
                        temp_arr.push(new Product(product));
                    }
                    this.product_list = temp_arr;
                    console.log("Logging products", this.product_list);
                    resolve(this.product_list);
                }).catch(ex => {
                    console.log("Something went wrong fetching the products.", ex);
                });
            }
        });
    }


    /* ==============  CARTS  ============== */

    getCart(): Promise<Cart> {
        return new Promise((resolve, reject) => {
          if (!!this.current_cart) {
              resolve(this.current_cart);
          } else {
            let params = {
              user_id: this.getCurrentUser()
            };
            this.authHttp.get(this.API_URL + "/api/cart", {params: params}).toPromise().then(cart => {
                const _cart = cart.json();
                this.current_cart = _cart;
                // this.user_loaded.emit(_cart);
                resolve(_cart);
            }).catch(ex => {
                reject(ex);
            });
          }
        });
    }

    addToCart(products): Promise<Cart> {
        return new Promise((resolve, reject) => {
          // if (!!this.current_cart) {
            let body = {
              user_id: this.getCurrentUser(),
              products: products
            };
            this.authHttp.post(this.API_URL + "/api/cart/update", body).toPromise().then(cart => {
                const _cart = cart.json();
                this.current_cart = _cart;
                // this.user_loaded.emit(_cart);
                resolve(_cart);
            }).catch(ex => {
                reject(ex);
            });
          // } else {
            // reject("NO CART YET");
            // LOCAL CART
          // }
        });
    }

    deleteCart(): Promise<string> {
        return new Promise((resolve, reject) => {
          // if (!!this.current_cart) {
            let params = {
              user_id: this.getCurrentUser()
            };
            this.authHttp.delete(this.API_URL + "/api/cart/delete", {params: params}).toPromise().then(reponse => {
                const _response = reponse.json();
                // this.user_loaded.emit(_cart);
                resolve(_response);
            }).catch(ex => {
                reject(ex);
            });
          // } else {
            // reject("NO CART YET");
            // LOCAL CART
          // }
        });
    }

}
