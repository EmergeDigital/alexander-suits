import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, HttpModule} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from "../models/user";
import {Product} from "../models/product";

@Injectable()
export class DataService {

    API_URL: string;

    current_user: User;
    product_list: Product[];

    constructor(public http: Http) {
        this.API_URL = "http://127.0.0.1:1337";
    }

    setupDatabase(): void {

    }

    getProducts(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            if (!!this.product_list) {
                resolve(this.product_list);
            } else {
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

}
