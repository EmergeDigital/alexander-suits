import { Injectable } from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'VO9x2cg0a8V3Msca5FmrrnR5yKyakbT4',
    domain: 'bloom.au.auth0.com',
    responseType: 'token id_token',
    audience: 'https://bloom.au.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  });

  constructor(public router: AppRoutingModule) {}

  public login(): void {
    this.auth0.authorize();
  }

}
