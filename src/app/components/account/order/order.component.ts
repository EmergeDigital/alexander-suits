import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Order} from "../../../models/order";
import {AuthService} from '../../../services/auth.service';
import {DataService} from '../../../services/data.service';
import {SessionService} from '../../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    id: string;
    private sub: any;
    public order: Order;
    public error: string;
    public isLoading: boolean;

    constructor(private route: ActivatedRoute, public auth: AuthService, public data: DataService, public router: Router, public session: SessionService) {}

  ngOnInit() {
   this.isLoading = true;
   this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      if(this.auth.isAuthenticated()) {
        console.log(this.auth.isAuthenticated());
        if(!!this.data.getCurrentUser()) {
          console.log(this.data.getCurrentUser());
          this.data.getOrderById(this.id).then(order=> {
            this.order = order;
            this.isLoading = false;
            console.log(order);
          });
        } else {
          this.data.user_loaded.subscribe(user=> {
            this.data.getOrderById(this.id).then(order=> {
              this.order = order;
              this.isLoading = false;

              console.log(order);
            });
          })
        }
      } else {
        this.auth._authenticated.subscribe(authenticated=> {
          if (authenticated) {
            this.data.user_loaded.subscribe(user=> {
              this.data.getOrderById(this.id).then(order=> {
                this.order = order;
                this.isLoading = false;

                console.log(order);
              });
            })
          }
        })
      }
      // Fetch order from API
   });
 }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  makePayment() {
    this.session.storeOrder(this.order);
    this.session.storeTransaction(null);
    this.router.navigate(['/payment']);
  }

}
