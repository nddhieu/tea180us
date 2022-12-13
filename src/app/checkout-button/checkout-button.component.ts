import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";
import {Cart} from "../shared/models/Cart";

@Component({
  selector: 'app-checkout-button',
  templateUrl: './checkout-button.component.html',
  styleUrls: ['./checkout-button.component.css']
})
export class CheckoutButtonComponent implements OnInit {
  cart: Cart;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    console.log("checkout button init");
    this.cart = this.cartService.getCart();
  }
  onCheckoutButtonClick() {
    this.router.navigate(['/checkout']);
  }
}
