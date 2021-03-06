import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, HttpModule} from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {AuthService} from './auth.service';
import {SessionService} from './session.service';
import {FunctionsService} from './functions.service';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { TdFileService, IUploadOptions } from '@covalent/core';

import {User} from "../models/user";
import {Product} from "../models/product";
import {Cart} from "../models/cart";
import {Order} from "../models/order";
import { Lining } from '../models/lining';

@Injectable()
export class DataService {

    API_URL: string;

    current_user: User;
    current_cart: Cart;
    current_order: Order;
    product_list: Product[];
    lining_list: Lining[];
    user_id: string;
    user_loaded: EventEmitter<User> = new EventEmitter();
    _cartUpdated: EventEmitter<Cart> = new EventEmitter();
    _cartUpdating: EventEmitter<boolean> = new EventEmitter();
    _orderCreated: EventEmitter<Order> = new EventEmitter();
    has_loaded: boolean;
    // user: any;

    constructor(public auth: AuthService, public http: Http, public authHttp: AuthHttp,  public session: SessionService, public functions: FunctionsService, public fileUploadService: TdFileService) {
        this.API_URL = environment.apiUrl;
        // auth._user.subscribe(user=>{
        //
        // })
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
                // console.log(localStorage.getItem('access_token'));
                // console.log(localStorage.getItem('id_token'));
                // console.log(localStorage.getItem('expires_at'));
                let options =
                this.http.get(this.API_URL + "/api/products/all").toPromise().then(products => {
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

    _getProducts(options): Promise<Product[]> {
      return new Promise((resolve, reject) => {
              // console.log(localStorage.getItem('access_token'));
              // console.log(localStorage.getItem('id_token'));
              // console.log(localStorage.getItem('expires_at'));
        this.http.get(this.API_URL + "/api/products/all", {params: options}).toPromise().then(products => {
            const got_products = products.json();
            const temp_arr = [];
            for (const product of got_products) {
                temp_arr.push(new Product(product));
            }
            // console.log("Logging products", temp_arr);
            resolve(temp_arr);
        }).catch(ex => {
            console.log("Something went wrong fetching the products.", ex);
        });
      });
  }

  /* ==============  LININGS  ============== */

  getLinings(): Promise<Lining[]> {
    return new Promise((resolve, reject) => {
        if (!!this.lining_list) {
            resolve(this.lining_list);
        } else {
            this.http.get(this.API_URL + "/api/linings/all").toPromise().then(data => {
                const linings = data.json();
                const temp_arr = [];
                for (const lining of linings) {
                    temp_arr.push(new Lining(lining));
                }
                this.lining_list = temp_arr;
                console.log("Logging linings", this.lining_list);
                resolve(this.lining_list);
            }).catch(ex => {
                console.log("Something went wrong fetching the products.", ex);
            });
        }
    });
}

    /* ==============  CARTS  ============== */

    switchCarts(auth): Promise<Cart> {
        return new Promise((resolve, reject) => {

            if(auth) {
              //Fetch/await user load then get cart from server with merge options
              if(!!this.user_id) {
                // this.getCartUser(this.user_id).then(cart=>{
                //   resolve(cart);
                // });
                this.findCart().then(cart=>{
                  resolve(cart);
                })
              } else {
                this.user_loaded.subscribe(user=>{
                  // this.getCartUser(user.user_id).then(cart=>{
                  //   resolve(cart);
                  // });
                  this.findCart().then(cart=>{
                    resolve(cart);
                  })
                });
                this.findCart().then(cart=>{
                  resolve(cart);
                })
              }
            } else {
              let local_cart = this.session.getLocalCart();
              if(!!local_cart) {
                this.current_cart = local_cart;
                this._cartUpdated.emit(local_cart);
                resolve(local_cart);
              } else {
                let cart = new Cart({user_id: "visitor"});
                this.session.setLocalCart(cart);
                this.current_cart = cart;
                this._cartUpdated.emit(cart);
                resolve(cart);
              }
            }
        });
    }


    findCart(): Promise<Cart> {
        return new Promise((resolve, reject) => {
            let local_cart = this.session.getLocalCart();

            if(this.auth.isAuthenticated()) {
              //Fetch/await user load then get cart from server with merge options
              if(this.has_loaded) {
                console.log(this.current_user);
                this.mergeCart(local_cart).then(cart=>{
                  resolve(cart);
                });
              } else {
                this.user_loaded.subscribe(user=>{
                  this.mergeCart(local_cart).then(cart=>{
                    resolve(cart);
                  });
                })
              }
            } else {
              if(!!local_cart) {
                resolve(local_cart);
              } else {
                let cart = new Cart({user_id: "visitor"});
                this.session.setLocalCart(cart);
                resolve(cart);
              }
            }
        });
    }

    mergeCart(local_cart): Promise<Cart> {
      return new Promise((resolve, reject) => {
        if (!!local_cart && !!local_cart.products) { //LOCAL CART EXISTS
          // let body = {
          //   user_id: this.user_id,
          //   local_cart: local_cart
          // };
          // console.log(params);
          this.UpdateCart(local_cart.products).then(cart=>{
            this.session.setLocalCart(null);
            resolve(cart);
          })
          // this.authHttp.get(this.API_URL + "/api/cart/merge", body).toPromise().then(cart => {
          //     const _cart = cart.json();
          //     this.current_cart = _cart;
          //     this.session.setLocalCart(null);
          //     resolve(_cart);
          // }).catch(ex => {
          //     reject(ex);
          // });
        } else { //DOESNT EXIST
          this.getCart().then(cart => {
            resolve(cart);
          })
        }
      });
    }



    getCart(): Promise<Cart> {
        return new Promise((resolve, reject) => {
          if (!!this.current_cart) {
              resolve(this.current_cart);
          } else {
            if(!!this.user_id) {
              this.getCartUser(this.user_id).then(cart=>{
                resolve(cart);
              });
            } else {
              this.user_loaded.subscribe(user=>{
                this.getCartUser(user.user_id).then(cart=>{
                  resolve(cart);
                });
              });
            }

          }
        });
    }

    getCartUser(id): Promise<Cart> {
        return new Promise((resolve, reject) => {
          let params = {
            user_id: id
          };
          this.authHttp.get(this.API_URL + "/api/cart", {params: params}).toPromise().then(cart => {
              const _cart = cart.json();
              this.current_cart = _cart;
              this._cartUpdated.emit(_cart);
              resolve(_cart);
          }).catch(ex => {
              reject(ex);
          });
        });
    }

    UpdateCart(products, total: number = 0): Promise<Cart> {
        return new Promise((resolve, reject) => {
          this._cartUpdating.emit(true);
          if(this.auth.isAuthenticated()) {
            //TODO Create new products array with just id & count to reduce request size
            let body = {
              user_id: this.getCurrentUser(),
              products
            };
            this.authHttp.post(this.API_URL + "/api/cart/update", body).toPromise().then(cart => {
                const _cart = cart.json();
                this.current_cart = _cart;
                // this.user_loaded.emit(_cart);
                this._cartUpdated.emit(_cart);
                resolve(_cart);
            }).catch(ex => {
                this._cartUpdating.emit(false);
                reject(ex);
            });
          } else {
            //update local cart
            let cart = this.session.getLocalCart();


            let body = {
              products,
              _products: cart.products || []
            };
            console.log("ADDING TO CART LOCALLY");
            this.http.post(this.API_URL + "/api/cart/merge", body).toPromise().then(fetched_cart => {
              const _cart = fetched_cart.json();
              this.current_cart = _cart;
              // this.user_loaded.emit(_cart);
              this.session.setLocalCart(_cart);
              this._cartUpdated.emit(_cart);
              resolve(_cart);
            }).catch(ex => {
              reject("Couldn't fetch product info");
            });
          }

        });
    }

    deleteCart(): Promise<string> {
      this._cartUpdating.emit(true);
        return new Promise((resolve, reject) => {
          if (this.auth.isAuthenticated()) {
            let params = {
              user_id: this.getCurrentUser()
            };
            this.authHttp.delete(this.API_URL + "/api/cart/delete", {params: params}).toPromise().then(reponse => {
                const _response = reponse.json();
                // this.user_loaded.emit(_cart);
                this._cartUpdated.emit(null);
                resolve(_response);
            }).catch(ex => {
                reject(ex);
            });
          } else {
            // reject("NO CART YET");
            this.session.setLocalCart(null);
            this._cartUpdated.emit(null);
            resolve("success");
            // LOCAL CART
          }
        });
    }

    checkout(data): Promise<Order> {
      return new Promise((resolve, reject) => {
        if(this.auth.isAuthenticated()) {
          let user = this.current_user;

          let cart_data = {
            user_id: user.user_id,
            user_data: data.user_data,
            delivery_data: data.delivery_data,
            address_data: data.address_data,
            contact_number: data.contact_number,
            contact_email: data.contact_email
          };
          this.authHttp.post(this.API_URL + "/api/order/create", cart_data).toPromise().then(reponse => {
              const _response = reponse.json();
              // this.user_loaded.emit(_cart);
              this._orderCreated.emit(null);
              this.current_order = _response;
              resolve(_response);
          }).catch(ex => {
              reject(ex);
          });
        } else {
          reject("no_auth");
        }
      });
    }

    getOrders(): Promise<Order[]> {
        return new Promise((resolve, reject) => {
          let params = {
            user_id: this.user_id
          };
          this.authHttp.get(this.API_URL + "/api/orders", {params: params}).toPromise().then(orders => {
              const _orders = orders.json();
              resolve(_orders);
          }).catch(ex => {
              reject(ex);
          });
        });
    }

    getOrder(order_string): Promise<Order> {
        return new Promise((resolve, reject) => {
          let params = {
            order_string: order_string
          };
          this.authHttp.get(this.API_URL + "/api/order", {params: params}).toPromise().then(order => {
              const _order = order.json();
              resolve(_order);
          }).catch(ex => {
              reject(ex);
          });
        });
    }

    getOrderById(id): Promise<Order> {
        return new Promise((resolve, reject) => {
          let params = {
            id: id
          };
          this.authHttp.get(this.API_URL + "/api/order", {params: params}).toPromise().then(order => {
              const _order = order.json();
              resolve(_order);
          }).catch(ex => {
              reject(ex);
          });
        });
    }

    getPaymentOptions(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.authHttp.get(this.API_URL + "/api/transactions/paymentOptions").toPromise().then(result => {
            const _result = result.json();
            resolve(_result);
        }).catch(ex => {
            reject(ex);
        });
      });
    }

    createTransaction(method, order_string): Promise<any> {
      return new Promise((resolve, reject) => {
        this.authHttp.post(this.API_URL + "/api/transactions/new", {method: method, order_string: order_string}).toPromise().then(result => {
            const _result = result.json();
            resolve(_result);
        }).catch(ex => {
            reject(ex);
        });
      });
    }

    uploadImage(file): Promise<any> {
      return new Promise((resolve, reject) => {
        let options: IUploadOptions = {
          url: this.API_URL + '/api/functions/uploadFile',
          method: 'post',
          file: file
        };
        this.fileUploadService.upload(options).subscribe((response) => {
          console.log(response);
          if(response.error) {
            reject(response.error);
          } else {
            resolve(response.replace(/"/g,""));
          }
          // this.fileUpload = ;
        });
      })
    }


}
