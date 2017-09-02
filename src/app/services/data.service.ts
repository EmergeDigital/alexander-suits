import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, HttpModule} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

import {User} from "../models/user";
import {Product} from "../models/product";

@Injectable()
export class DataService {



    constructor(public http: Http) {

    }

}
