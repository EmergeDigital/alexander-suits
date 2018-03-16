import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';
import { CheckoutStage } from '../../../models/checkoutStage';
import { Address } from '../../../models/address';

@Component({
    selector: 'checkout-delivery-method',
    templateUrl: './delivery-method.component.html',
    styleUrls: ['./delivery-method.component.scss']
})
export class DeliveryMethodComponent implements OnInit {

    private selectedDeliveryMethod: string = "DHL Delivery";
    private addressDetails: Address = new Address({});
    private isDHLDeliveryToDifferentAddress: boolean = false;

    constructor(private checkoutService: CheckoutService) { }

    public ngOnInit(): void {
        this.addressDetails = this.checkoutService.optionalAddressDetails;
        this.selectedDeliveryMethod = this.checkoutService.selectedDeliveryMethod;
        this.isDHLDeliveryToDifferentAddress = this.checkoutService.isDHLDeliveryToDifferentAddress;
    }

    private Previous(): void {
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.Details)
    }

    private Next(): void {
        this.checkoutService.optionalAddressDetails = this.addressDetails;
        this.checkoutService.selectedDeliveryMethod = this.selectedDeliveryMethod;
        this.checkoutService.isDHLDeliveryToDifferentAddress = this.isDHLDeliveryToDifferentAddress;
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.CompleteOrder)
    }
}
