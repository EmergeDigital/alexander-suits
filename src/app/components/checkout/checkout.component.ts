import { Component, OnInit } from '@angular/core';
import { CheckoutStage } from '../../models/checkoutStage';
import { CheckoutService } from '../../services/checkout.service';

@Component({
    selector: 'checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    public CheckoutStage = CheckoutStage; // Html Reference
  
    public currentCheckoutStage: CheckoutStage = CheckoutStage.FinalizeCart;

    constructor(public checkoutService: CheckoutService) { }

    public ngOnInit(): void {
        this.checkoutService.SetCheckoutStage.subscribe((checkoutStage: CheckoutStage) => this.currentCheckoutStage = checkoutStage);
    }

}
