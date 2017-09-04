import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
// import {DataService} from "./data.service";

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'VO9x2cg0a8V3Msca5FmrrnR5yKyakbT4',
    domain: 'bloom.au.auth0.com',
    responseType: 'token id_token',
    audience: 'alexander-suits',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid full_access'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        // this.router.navigate(['/home']);
        this.auth0.client.userInfo(authResult.accessToken, (err, user) =>{
          //Do something with user information
          console.log(this.getUserID(user));
          // this.data.setUser(this.getUserID(user));
        });
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  public getUserID(user) {
    let userParts = user.sub.split('|');
    return userParts[1];
  }

  //USER INFO REFERENCE
  /*
  {
      "email_verified": "false",
      "email": "test@example.com",
      "clientID": "AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH",
      "updated_at": "2017-02-07T20:50:33.563Z",
      "name": "tester9@example.com",
      "picture": "https://gravatar.com/avatar/example.png",
      "user_id": "auth0|123456789012345678901234",
      "nickname": "tester9",
      "identities": [
          {
              "user_id": "123456789012345678901234",
              "provider": "auth0",
              "connection": "Username-Password-Authentication",
              "isSocial": "false"
          }
      ],
      "created_at": "2017-01-20T20:06:05.008Z",
      "sub": "auth0|123456789012345678901234"
  }
*/

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    console.log(localStorage.getItem('access_token'));
    console.log(localStorage.getItem('id_token'));
    console.log(localStorage.getItem('expires_at'));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
