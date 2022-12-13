import {CartItem} from "./cartItem";
import {constant} from "../constant";

export class Cart{
  customerId:number;
  items: CartItem[]=[];
  totalPrice:number ;
  tax:number;
  taxPercent : number = constant.taxPercent;
  getTotalRawCost(){
    let totalPrice = 0;
    this.items.forEach(item => {
      totalPrice += item.getPrice();
      item.price = item.getPrice();
    })
    return totalPrice;
  }
  getTaxCost ():number {
    return this.getTotalRawCost() * this.taxPercent /100 ;
  }

  getTotalCostIncludeTax():number {
    return this.getTotalRawCost() + this.getTaxCost();
  }

}
