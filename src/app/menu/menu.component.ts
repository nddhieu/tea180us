import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {CartService} from "../services/cart.service";
import {Product} from "../shared/models/product";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private productService: ProductService, private route:ActivatedRoute, private cartService:CartService) { }
  products: Product[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("search Item path")
      console.log(params)
      if (params['searchItem']){

        this.products = this.productService.getAll().filter(food => food.name.toLowerCase().includes(params['searchItem'].toLowerCase()))
      } else {
        this.products = this.productService.getAll();
      }
    })
  }
  addToCart(food:Product){
    this.cartService.addToCart(food);
  }
  getquantityInCartByItemId(id:number):String{
    if (this.cartService.getQuantityOfItemById(id)<=0 )return "+";
    return  this.cartService.getQuantityOfItemById(id).toString();

  }
  isItemInCart(id:number): boolean{
    return  this.cartService.getQuantityOfItemById(id)>0;

  };
  // removeFromCart(id:number){
  //   this.cartService.remove1ItemFromCart(id);
  //   if (this.cartService.getQuantityOfItemById(id)==0){
  //     this.cartService.removeFromCartById(id);
  //   }
  // }
}
