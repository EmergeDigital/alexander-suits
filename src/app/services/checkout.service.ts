import { Injectable, EventEmitter } from "@angular/core";
import { CheckoutStage } from "../models/checkoutStage";
import { User } from "../models/user";
import { Address } from "../models/address";

@Injectable()
export class CheckoutService {    
    private checkoutStage: CheckoutStage = CheckoutStage.FinalizeCart;
    public get CheckoutStage(): CheckoutStage { return this.checkoutStage; }
    public SetCheckoutStage: EventEmitter<CheckoutStage> = new EventEmitter<CheckoutStage>();

    public user: User = new User({});
    public isUpdateUserRequired: boolean = false;
    public optionalAddressDetails: Address = new Address({});

    constructor() {
        this.SetCheckoutStage.subscribe((checkoutStage: CheckoutStage) => this.checkoutStage = checkoutStage);
    }
}