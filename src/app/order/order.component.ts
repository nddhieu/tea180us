import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";

class CustomerService {
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  displayCart: boolean;

  constructor(private cartService:CartService) { }

  ngOnInit() {
  }
  getDisPlayCart():boolean {
    return this.cartService.displayCart;
  }
}
