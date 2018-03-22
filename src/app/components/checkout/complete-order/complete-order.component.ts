import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';
import { CheckoutStage } from '../../../models/checkoutStage';

@Component({
    selector: 'checkout-complete-order',
    templateUrl: './complete-order.component.html',
    styleUrls: ['./complete-order.component.scss']
})
export class CompleteOrderComponent implements OnInit {

    constructor(public checkoutService: CheckoutService) { }

    public ngOnInit(): void {
    }

    public Previous(): void {
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.DeliveryMethod)
    }

    public Next(): void {
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.PaymentMethod)
    }
}
