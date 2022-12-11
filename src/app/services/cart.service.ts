import {Injectable} from '@angular/core';
import {Cart} from "../shared/models/Cart";
import {ProductService} from "./product.service";
import {Product} from "../shared/models/product";
import {CartItem} from "../shared/models/cartItem";
import {AddOnItem} from "../shared/models/addOnItem";
import {AddOn} from "../shared/models/addOn";
import {Customer} from "../shared/models/customer";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  quantityOption: number[] = Array.from({length: 100}, (_, i) => i + 1);
  displayCart: boolean = true;
  constructor() {
  }

  private cart: Cart = new Cart();

  toggleDisplayCart(){
    console.log("toogleDisplayCart. current " + this.displayCart + "set to " + !this.displayCart);
    this.displayCart = !this.displayCart;
  }
  addToCart(food: Product): void {
    console.log("add to cart " + food.name);
    let cartItem = this.cart.items.find(item => item.food === food)
    if (cartItem) {
      console.log("cartItem " + cartItem.food.name + "price" + cartItem.price + "quantity: " + cartItem.quantity);
      this.changeQuantity(food, cartItem.quantity + 1)
      console.log("cartItem after add to cart" + cartItem.food.name + "price" + cartItem.price + "quantity: " + cartItem.quantity);
      return;
    }
    this.cart.items.push(new CartItem(food));
    console.log("cart items :" + this.cart.items.length);
  }

  removeFromCartById(foodId: number) {
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
  }
  removeFromCart(cartItem: CartItem) {
    this.cart.items = this.cart.items.filter(item => item != cartItem);
  }
  changeQuantity(food: Product, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food === food);
    if (!cartItem) return;
    cartItem.quantity = quantity;
  }

  getCart(): Cart {
    return this.cart;
  }

  getQuantityOfItemById(foodId: number): number {
    let cartItem: CartItem[] = this.cart.items.filter(item => item.food.id === foodId);
    if (!cartItem) {
      return 0;
    } else {
      let countItem:number = 0;
      cartItem.forEach(item => countItem += Number(item.quantity));
      return countItem;

    }
  }

  remove1ItemFromCart(foodId: number) {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if (cartItem) {
      cartItem.quantity -= 1;

    }

  }

  getTotalCartCost(): number {
    let total: number = 0;
    this.cart.items.forEach(cartItem => total += cartItem.getPrice());
    return total;
  }

  changeQuantityCartItem(cartItem: CartItem, newQuantity: number) {
    let existCartItem = this.cart.items.find(item => item === cartItem);
    if (!cartItem) return;
    cartItem.quantity = newQuantity;
  }

  optionsBeenAdded(item: CartItem): AddOn {
    let addOnHaveAddedOption: AddOn = null;
    let addedOption = item.food.addOn.option.filter(option => option.isAdd);
    if (addedOption) {
      addOnHaveAddedOption = new AddOn()
      addOnHaveAddedOption.title = item.food.addOn.title;
      addOnHaveAddedOption.description = item.food.addOn.description;
      addOnHaveAddedOption.option = (addedOption);
    }
    return addOnHaveAddedOption
  }

  setCustomerToCart(cus : Customer){
    let customerId = cus[0].customerId;
    console.log("set customer to cart: " +customerId+ "----" + JSON.stringify(cus));
    this.cart.customerId = customerId;
    console.log("current cart " + JSON.stringify(this.cart));

  }
}
