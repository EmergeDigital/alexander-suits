import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';
import { CheckoutStage } from '../../../models/checkoutStage';
import { User } from '../../../models/user';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { Cart } from '../../../models/cart';

@Component({
    selector: 'checkout-payment-method',
    templateUrl: './payment-method.component.html',
    styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

    public current_user: User;
    public cart: Cart = new Cart({});

    constructor(public checkoutService: CheckoutService, public data: DataService, public router: Router) { }

    public ngOnInit(): void {
        this.data.getCart().then((cart: Cart) => this.cart = cart);
        this.LoadUser();
    }

    public LoadUser(): void {
        if (this.data.hasLoaded()) {
            let id = this.data.getCurrentUser;
            this.data.getUser(id).then((user) => {
                this.current_user = user;
            });
        } else {
            this.current_user = this.checkoutService.user;
            this.data.user_loaded.subscribe(user => {
                this.current_user = user;
            });
        }
    }

    public Previous(): void {
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.CompleteOrder)
    }

    public Complete(paymentMethod: string): void {
        let addressObj = {};
        let deliveryObj = {};
        let userObj = {};
        let user = this.current_user;
        switch (this.checkoutService.selectedDeliveryMethod) {
            case "DHL Delivery":
                console.log("DHL");
                deliveryObj = {
                    method: "DHL",
                    delivery_instructions: this.checkoutService.optionalAddressDetails.instructions
                };
                if (this.checkoutService.isDHLDeliveryToDifferentAddress) {
                    addressObj = {
                        addressL1: this.checkoutService.optionalAddressDetails.address,
                        addressL2: this.checkoutService.optionalAddressDetails.address2,
                        city: this.checkoutService.optionalAddressDetails.city,
                        province: this.checkoutService.optionalAddressDetails.province,
                        postal_code: this.checkoutService.optionalAddressDetails.postal_code,
                        country: this.checkoutService.optionalAddressDetails.country
                    };
                    console.log(addressObj);
                } else {
                    console.log("HOME");
                    addressObj = {
                        addressL1: user.address,
                        addressL2: user.address2,
                        city: user.city,
                        province: user.province,
                        postal_code: user.postal_code,
                        country: user.country
                    };
                    console.log(addressObj);
                }
                break;
            case "Pickup from us":
                deliveryObj = {
                    method: "Pickup"
                };
                break;
            case "Other":
                deliveryObj = {
                    method: "Other",
                    delivery_instructions: this.checkoutService.optionalAddressDetails.instructions
                };
                break;
        }

        userObj = {
            name: user.fullname,
            measurements: { generalMeasurements: this.cart.products[0].extras.generalMeasurements, finerMeasurements: this.cart.products[0].extras.finerMeasurements }
        };

        let current_user = user;
        current_user.measurements = { generalMeasurements: this.cart.products[0].extras.generalMeasurements, finerMeasurements: this.cart.products[0].extras.finerMeasurements };

        this.data.setUser(current_user).then(result => {
            let cart_data = {
                user_data: userObj,
                address_data: addressObj,
                delivery_data: deliveryObj,
                contact_number: user.contact_mobile,
                contact_email: user.email,
            };
            this.data.checkout(cart_data).then(order => {
                this.data.deleteCart().then((response) => {
                    this.router.navigate(['/home']);
                });
            })
        }).catch(ex => {
        })

    }
}
