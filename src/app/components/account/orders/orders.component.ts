import { Component, OnInit } from '@angular/core';
import {Order} from "../../../models/order";
import {AuthService} from '../../../services/auth.service';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  public error: string;
  public isLoading: boolean;

  constructor(auth: AuthService, data: DataService) {

    this.isLoading = true;
    if(auth.isAuthenticated()) {
      console.log(auth.isAuthenticated());
      if(!!data.getCurrentUser()) {
        console.log(data.getCurrentUser());
        data.getOrders().then(orders=> {
          this.orders = orders;
          this.isLoading = false;
          console.log(orders);
        });
      } else {
        data.user_loaded.subscribe(user=> {
          data.getOrders().then(orders=> {
            this.orders = orders;
            this.isLoading = false;

            console.log(orders);
          });
        })
      }
    } else {
      auth._authenticated.subscribe(authenticated=> {
        if (authenticated) {
          data.user_loaded.subscribe(user=> {
            data.getOrders().then(orders=> {
              this.orders = orders;
              this.isLoading = false;

              console.log(orders);
            });
          })
        }
      })
    }

  }

  ngOnInit() {
  }


}
