import {Product} from "./product";

export class CartItem{
  constructor(food: Product) {
    this.food = food;
  }
  food: Product;
  quantity:number = 1;
  price:number ;
  getPrice(): number {
    let itemCost : number = 0;
    this.food.addOn.option.filter(option => option.isAdd).forEach(option =>itemCost += option.price)
    itemCost += this.food.price;
    return itemCost * this.quantity;
  }

}
