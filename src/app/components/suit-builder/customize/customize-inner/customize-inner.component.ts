import { Component, OnInit } from '@angular/core';
import {Http, Headers, HttpModule} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-customize-inner',
  templateUrl: './customize-inner.component.html',
  styleUrls: ['./customize-inner.component.scss']
})
export class CustomizeInnerComponent implements OnInit {

  constructor(private http: Http) { }

  authToken: string;

  ngOnInit() {
  }

  startLogin() {
    this.login().then((success)=>
      {
        console.log(success);
      })
  }

  login() {

    let addr = "http://0.0.0.0:8000/v1/account/login";
    let payload = {
      "email": "courtney@codelab.io",
      "password": "****"
    };

    return new Promise((resolve, reject) => {
        let req = this.http.post(addr, payload);

        //REQUEST WITH PARAMS, IMPORT HTTPHEADERS SOMEHOW
        // let req = this.http.post(addr, payload, {
        //   headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
        // });

        //REQUEST WITH PARAMS, IMPORT HTTPPARAMS SOMEHOW
        // let req = this.http.post('/api/items/add', body, {
        //   params: new HttpParams().set('id', '3'),
        // })
        // 0 requests made - .subscribe() not called.
        req.subscribe(data => console.log(data));
        // 1 request made.
        req.subscribe(data => console.log(data));
        // 2 requests made.
    });
  }

  _wrapAndRequest(request, resolve, reject) {
      if (this.authToken) {
          request.set('Authorization', this.authToken);
      }
      request.end(function (err, result) {
          if (err) {
              reject({status: err.status, result: (result) ? result.body : null});
          } else {
              resolve(result.body);
          }
      });
  }


}
