import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';
import { CheckoutStage } from '../../../models/checkoutStage';

@Component({
    selector: 'checkout-complete-order',
    templateUrl: './complete-order.component.html',
    styleUrls: ['./complete-order.component.scss']
})
export class CompleteOrderComponent implements OnInit {

    constructor(private checkoutService: CheckoutService) { }

    public ngOnInit(): void {
    }

    private Previous(): void {
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.DeliveryMethod)
    }

    private Next(): void {
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.PaymentMethod)
    }
}
