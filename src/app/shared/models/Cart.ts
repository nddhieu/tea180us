import {CartItem} from "./cartItem";

export class Cart{
  customerId:number;
  items: CartItem[]=[];
  totalPrice:number ;
  getTotalPrice():number {
    let totalPrice = 0;
    this.items.forEach(item => {
      totalPrice += item.getPrice();
      item.price = item.getPrice();

    })
    return totalPrice;
  }

}
