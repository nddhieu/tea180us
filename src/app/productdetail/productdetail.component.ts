import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {CartService} from "../services/cart.service";
import {Product} from "../shared/models/product";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  selectQuantity: number;
  constructor( private activatedRoute: ActivatedRoute,
               private router:Router,
               private drinkService:ProductService,
               private cartService:CartService) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']){
        this.food = drinkService.getDrinkById(params['id'])
      }
    });
    this.selectQuantity = 1;
    this.quantityOption = this.cartService.quantityOption;
  }
  food !:Product;
  quantityOption:number[];
  ngOnInit(): void {
  }

  get itemCost():number {
    let addOnTotalPrice = 0;
    this.food.addOn.option.filter(option => option.isAdd).map(option => option.price).forEach(optionPrice => addOnTotalPrice +=optionPrice);
    return (this.food.price+ addOnTotalPrice) * this.selectQuantity;
  }

  addItemToOrder(food: Product) {
    for (let i = 0; i <this.selectQuantity ; i++) {
      this.cartService.addToCart(food);
    }
    this.router.navigate(['/']);
  }

}
