import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../models/cart';
import { CheckoutService } from '../../../services/checkout.service';
import { CheckoutStage } from '../../../models/checkoutStage';
import { DataService } from '../../../services/data.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'checkout-finalize-cart',
  templateUrl: './finalize-cart.component.html',
  styleUrls: ['./finalize-cart.component.scss']
})
export class FinalizeCartComponent implements OnInit {

  private cart: Cart = new Cart({});
  private errorMessage: string = "";

  constructor(private dataService: DataService, private checkoutService: CheckoutService) { }

  public ngOnInit(): void {
    this.dataService.getCart().then((cart: Cart) => this.cart = cart);
  }

  private RemoveProduct(indexOfProduct: number): void {
    this.cart.products.splice(indexOfProduct);
    this.dataService.UpdateCart(this.cart)
      .then((cart: Cart) => { this.cart = cart; this.errorMessage = ""; })
      .catch((reason) => this.errorMessage = reason);
  }

  private Next(): void {
    this.checkoutService.SetCheckoutStage.emit(CheckoutStage.Details)
  }

}