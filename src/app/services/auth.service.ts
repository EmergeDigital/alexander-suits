import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { environment } from '../../environments/environment';
import * as auth0 from 'auth0-js';
// import {DataService} from "./data.service";

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'VO9x2cg0a8V3Msca5FmrrnR5yKyakbT4',
    domain: 'bloom.au.auth0.com',
    responseType: 'token id_token',
    audience: 'alexander-suits',
    redirectUri: environment.authCallback,
    scope: 'openid email name'
  });
  _authenticated: EventEmitter<boolean> = new EventEmitter();
  _authenticating: EventEmitter<boolean> = new EventEmitter();
  user: any;
  _user: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public parseAuth(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      if(this.isAuthenticated()) {
        let token = localStorage.getItem('access_token');
        this.getCurrentUser(token).then((user)=>{
          this._user.emit(this.user);
          // console.log(this.user);
        })

        this._authenticated.emit(true);
        resolve(true);
      } else {
        this._authenticating.subscribe(authenticating => {
          if(authenticating) {
            this._authenticated.subscribe(authenticated => {
              resolve(authenticated);
            });
          } else {
            reject(false);
          }
        });
        this.handleAuthentication();
      }
    });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if(!!authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          console.log("HALLO");
          this._authenticating.emit(true);
          window.location.hash = '';
          this.setSession(authResult);
          this.router.navigate(['/home']);
          this.getCurrentUser(authResult.accessToken).then((user)=>{
            this._user.emit(this.user);
          })
          // this.auth0.client.userInfo(authResult.accessToken, (err, user) =>{
          //   //Do something with user information
          //   this.user = this.getUserID(user);
          //
          //   this._user.emit(this.user);
          //   // console.log(this.getUserID(user));
          //   // this.data.setUser(this.getUserID(user));
          // });
        } else {
          this._authenticating.emit(false);
          this.router.navigate(['/home']);
          console.log("There was an error");
        }
      } else {
        // this._authenticating.emit(false);
        // this.router.navigate(['/home']);
        // console.log(err);
      }

      if(err) {
        this._authenticating.emit(false);
        this.router.navigate(['/home']);
        console.log(err);

      }

    });
  }

  public getUserID(user) {
    let userParts = user.sub.split('|');
    return userParts[1];
  }

  public getCurrentUser(accessToken) {
    return new Promise((resolve, reject) => {
      if(this.isAuthenticated()) {
        if(!(!!this.user)) {
            let token = localStorage.getItem('access_token');
            if (!!accessToken) {
              token = accessToken;
            }
            this.auth0.client.userInfo(token, (err, user) =>{
              //Do something with user information
              // console.log(JSON.stringify(user));
              let id = this.getUserID(user);
              this.user = {
                id: id,
                email: user.email
              };
              resolve(this.user);
            });
        } else {
          resolve(this.user);
        }
      } else {
          resolve(null);
      }

    });
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
    this._authenticated.emit(true);
    // console.log(localStorage.getItem('access_token'));
    // console.log(localStorage.getItem('id_token'));
    // console.log(localStorage.getItem('expires_at'));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
    this._authenticated.emit(false);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let returnVal = new Date().getTime() < expiresAt;
    return returnVal;
  }

}
