import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';
import { CheckoutStage } from '../../../models/checkoutStage';

@Component({
    selector: 'checkout-payment-method',
    templateUrl: './payment-method.component.html',
    styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

    constructor(private checkoutService: CheckoutService) { }

    public ngOnInit(): void {
    }

    private Previous(): void {
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.CompleteOrder)
    }

    private Complete(paymentMethod: string): void {
        //Checkout
    }
}