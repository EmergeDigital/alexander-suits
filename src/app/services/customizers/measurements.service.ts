import { Injectable } from '@angular/core';
import {DataService} from '../data.service';
import {AuthService} from '../auth.service';
import {SessionService} from '../session.service';

@Injectable()
export class MeasurementsService {

  public measurements: any = {};
  current_user: any = null;
  public comments: string = '';

  constructor(public auth: AuthService, public data: DataService, public session: SessionService) { 

    if(auth.isAuthenticated()) {
      this.loadData();
    } else {
      auth._authenticated.subscribe(status => {
        if(status === true) {
          this.loadData();
        }
      })
    }
  }

  // loadMeasurements() {
  //   this.measurements = this.current_user.measurements;
  // }

  loadData() {
    let m = this.fetchMeasurements();
    if(m === null) {
      if(this.data.hasLoaded()) {
        let id = this.data.getCurrentUser;
        this.data.getUser(id).then((user)=>{
          this.current_user = user;
          this.measurements = this.current_user.measurements;
        });
      } else {
        this.data.user_loaded.subscribe(user => {
          this.current_user = user;
          this.measurements = this.current_user.measurements;
        });
      }
    } else {
      this.measurements = m;
      this.loadOnlyUser();
    }
  }

  loadOnlyUser() {
    if(this.data.hasLoaded()) {
      let id = this.data.getCurrentUser;
      this.data.getUser(id).then((user)=>{
        this.current_user = user;
      });
    } else {
      this.data.user_loaded.subscribe(user => {
        this.current_user = user;
      });
    }
  }

  updateMeasurements() {
    if(this.current_user !== null) {
      let current_user = this.current_user;
      current_user.measurements = this.measurements;
      this.data.setUser(current_user).then(result => {
        return "success";
      }).catch(ex => {
        return "failed";
      })
    } else {
      return "no_auth";
    }
  }

  storeMeasurements(measurements) {
    this.measurements = measurements;
    this.session.storeMeasurements(measurements);
  }

  fetchMeasurements() {
    let m = this.session.fetchMeasurements;
    if(!!m) {
      return m;
    }
    return null;
  }

}
