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

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig, public data: DataService, public auth: AuthService, public router: Router, public session: SessionService) {
    // console.log(session.fetchOrder());
    this.isLoading = true;
    if(auth.isAuthenticated()) {
      this.current_order = session.fetchOrder();
      this.current_transaction = session.fetchTransaction();
      if(!!this.current_transaction) {
        console.log("CHECK API FOR TRANSACTION STATUS ETC");
        this.checkStatus();
      } else {
        console.log("FETCH & DISPLAY PAYMENT OPTIONS");
        this.fetchPaymentMethods();
      }
    } else {
      this.isLoading = false;
      alert("PLEASE LOG IN FIRST");
    }

  }

  checkStatus() {
    //POLL API FOR TRANSACTION STATUS, AFTER 10 tries, give up?
    this.completePayment();
  }

  fetchPaymentMethods() {
    //FETCH ALL AVAILABLE PAYMENT OPTIONS
    this.isLoading = false;
  }

  createPayment() {
    //POST TO SAILS API THEN TO PAYMENT GATEWAY
    //CREATE LOCAL TRANSACTION
    //NAVIGATE
  }

  completePayment() {
    //WHEN A TRANSACTION IS SUCCESSFUL, RUN THIS TO DISPLAY COMPLETION
    //CLEAR LOCAL TRANSACTION
    this.isLoading = false;
  }


  ngOnInit() {
  }

}
