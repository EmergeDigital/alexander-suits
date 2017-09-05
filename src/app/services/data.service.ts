import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, HttpModule} from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/toPromise';

import {User} from "../models/user";
import {Product} from "../models/product";

@Injectable()
export class DataService {

    API_URL: string;

    current_user: User;
    product_list: Product[];
    user_id: string;
    user: any;

    constructor(public auth: AuthService, public http: Http, public authHttp: AuthHttp) {
        this.API_URL = "http://localhost:1337";
    }

    setupDatabase(): void {

    }

    setUser(id) {
      this.user_id = id;
    }

    getUser(id): Promise<User> {
        return new Promise((resolve, reject) => {
            let params = {
              id: id
            };
            this.authHttp.get(this.API_URL + "/api/user", {params: params}).toPromise().then(user => {
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
              resolve(_user);
          }).catch(ex => {
              reject(ex);
          });

      });
    }

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

}
