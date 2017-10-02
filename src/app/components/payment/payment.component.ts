import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';
import {SessionService} from '../../services/session.service';
import { Router } from '@angular/router';
import {Product} from "../../models/product";
import {Order} from "../../models/order";
import {Cart} from "../../models/cart";
import {User} from "../../models/user";
import {MdDialog} from '@angular/material';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  current_order: Order;
  current_transaction: any;
  isLoading: boolean;
  paymentOptions: any[];
  paymentStatus: string;
  paymentSubstring: string;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public data: DataService, public auth: AuthService, public router: Router, public session: SessionService) {
    // console.log(session.fetchOrder());
    this.isLoading = true;
    if(auth.isAuthenticated()) {
      this.current_order = session.fetchOrder();
      if(!!this.current_order) {
        this.current_transaction = session.fetchTransaction();
        if(!!this.current_transaction) {
          console.log("CHECK API FOR TRANSACTION STATUS ETC");
          console.log(this.current_transaction);
          this.checkStatus();
        } else {
          console.log("FETCH & DISPLAY PAYMENT OPTIONS");
          this.fetchPaymentMethods();
        }
      } else {
        this.noOrder();
      }
    } else {
      this.isLoading = false;
      alert("PLEASE LOG IN FIRST");
    }

  }

  checkStatus() {
    //POLL API FOR TRANSACTION STATUS, AFTER 10 tries, give up?
    this.session.storeTransaction(null);
    this.data.getOrder(this.current_order.order_string).then(order=>{
      console.log(order);
      this.current_order = order;
      if(order.status === "processed") {
        this.completePayment();
      } else if(order.status === "failed" || order.status === "cancelled" || order.status === "refunded") {
        this.paymentFailed(order);
      } else {
        this.paymentUnknown();
      }
    });
  }

  fetchPaymentMethods() {
    //FETCH ALL AVAILABLE PAYMENT OPTIONS
    this.data.getPaymentOptions().then(options=>{
      this.paymentOptions = JSON.parse(options);
      this.isLoading = false;
    }).catch(ex=>{
      alert("There was a problem, please refresh.");
      console.log(ex);
      this.isLoading = false;
    });
    // this.isLoading = false;
  }

  selectOption(method) {
    this.isLoading = true;
    this.paymentOptions = null;
    this.data.createTransaction(method, this.current_order.order_string).then(payment => {
      console.log(payment);
      this.session.storeTransaction(payment);
      window.location.href=payment.link;
      this.isLoading = false;
    }).catch(ex=> {
      console.log(ex);
      this.fetchPaymentMethods();
    });
  }

  createPayment() {
    //POST TO SAILS API THEN TO PAYMENT GATEWAY
    //CREATE LOCAL TRANSACTION
    //NAVIGATE
  }

  noOrder() {
      this.paymentStatus = "You have no pending payment";
      this.paymentSubstring = "If you wish to make payment for an order, please go to your order page";
      this.session.storeOrder(null);
      this.isLoading = false;
  }

  paymentUnknown() {
    this.paymentStatus = "Payment failed with unknown error";
    this.paymentSubstring = "Your order has been placed, we will contact you to arrange payment";
    this.session.storeOrder(null);
    this.isLoading = false;
    //Run server query here to change order status etc and send out mails
  }

  paymentFailed(order) {
    this.paymentStatus = "Payment failed";
    this.paymentSubstring = "Please try again";
    this.session.storeOrder(order);
    this.fetchPaymentMethods();
    // this.isLoading = false;
  }

  completePayment() {
    //WHEN A TRANSACTION IS SUCCESSFUL, RUN THIS TO DISPLAY COMPLETION
    //CLEAR LOCAL TRANSACTION
    this.paymentStatus = "Payment Successful";
    this.paymentSubstring = "Thank you, please check your email inbox for updates on your order";
    this.session.storeOrder(null);
    this.isLoading = false;
  }


  ngOnInit() {
  }

}
