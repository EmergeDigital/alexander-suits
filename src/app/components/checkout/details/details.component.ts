import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';
import { CheckoutStage } from '../../../models/checkoutStage';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'checkout-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    private user: User = new User({});

    constructor(private dataService: DataService, private checkoutService: CheckoutService, private authService: AuthService) { }

    public ngOnInit(): void {
        if (this.authService.isAuthenticated() && this.checkoutService.isUpdateUserRequired == false) {
            this.LoadUser();
        } else {
            this.user = this.checkoutService.user;
        }
    }

    private LoadUser() {
        if (this.dataService.hasLoaded()) {
            this.dataService.getUser(this.dataService.getCurrentUser).then((user) => {
                this.user = user;
            });
        } else {
            this.dataService.user_loaded.subscribe(user => {
                this.user = user;
            });
        }
    }

    private Previous(): void {
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.FinalizeCart)
    }

    private Next(): void {
        this.checkoutService.user = this.user;
        this.checkoutService.SetCheckoutStage.emit(CheckoutStage.DeliveryMethod)
    }

}
