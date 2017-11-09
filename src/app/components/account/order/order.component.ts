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
 
 getBg(product) {
   return {'background-image': 'url(' + product.image_urls[0] + ')', 'background-size': 'cover'};
 }

 getImage(product) {
   if(!!product.image_urls && product.image_urls.length > 2) {
     if(this.isValidUrl(product.image_urls[2])) {
       console.log(product.image_urls[2]);
       return product.image_urls[2];
     }
   }
   return 'assets/casual-suit.png';
 }

 isValidUrl(value) {
   return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
 }

 unpaidStates: string[] = [
   "awaiting_payment",
   "payment_pending",
   "pending",
   "failed"
 ];

 unpaid(status) {
   if(this.unpaidStates.includes(status) || status === null) {
     return true;
   }
    return false;
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
