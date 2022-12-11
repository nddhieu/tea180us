import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user";
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Cart} from "../shared/models/Cart";
import {constant} from "../shared/constant";
import {CartItem} from "../shared/models/cartItem";
import {AddOn} from "../shared/models/addOn";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

// currentUser: User = this.userService.getCurrentUser();
  googlePayEnvironment: string = constant.googlePayEnvironment;

  get currentUser() {
    return this.userService.getCurrentUser();
  }

  set currenUser(user: User) {
    this.userService.setCurrentUser(user);
  }

  private _serviceSubscription;
  totalPrice: string = '0';

  constructor(private cartService: CartService, private router: Router, private userService: UserService) {
    this.quantityOption = this.cartService.quantityOption;
    // this._serviceSubscription = this.userService.onChangeUser.subscribe({
    //   next: (newUser: User) => {
    //     this.currentUser = newUser;
    //     console.log("listen to event user sign in constructor " + this.currentUser);
    //   }
    // })
  }

  quantityOption: number[];
  cart: Cart;
  address: String = constant.address;
  shopName: String = constant.shopName;


  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cart.totalPrice = this.cart.getTotalPrice();
    this.totalPrice = this.cart.totalPrice.toString();
    // this.currentUser = this.userService.getCurrentUser();
    // this._serviceSubscription = this.userService.onChangeUser.subscribe({
    //   next: (newUser: User) => {
    //     this.currentUser = newUser;
    //     console.log("listen to event user sign in ngonINit " + this.currentUser);
    //   }
    // })
    console.log("current User : " + JSON.stringify(this.currentUser));
  }

  updateCartItemQuantity(cartItem: CartItem, newQuantity: number) {
    this.cartService.changeQuantityCartItem(cartItem, newQuantity);
  }

  optionsBeenAdded(item: CartItem): AddOn {
    let response = this.cartService.optionsBeenAdded(item);
    console.log("response :" + item.food.name + "option: " + response.option);
    return response
  }

  getQuantityOfCartItem(cartItem: CartItem): number {
    console.log("cartItem: " + cartItem.quantity);
    return cartItem.quantity;
  }

  checkOut() {
    console.log("checking out:");
    console.log(JSON.stringify(this.cart));
    this.router.navigateByUrl('/checkout');

  }

  onSelect(item: CartItem, newQuantity: String) {
    console.log(newQuantity + "number " + Number(newQuantity));
    if (Number(newQuantity) != 0) {
      this.cartService.changeQuantityCartItem(item, Number(newQuantity));
    } else {
      console.log("remove from cart" + Number(newQuantity));
      this.cartService.removeFromCart(item);
      this.ngOnInit();
    }

  }

  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', "DISCOVER", 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: 'BCR2DN4T4SK2LXLN',
      merchantName: 'Tea180us'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '10',
      currencyCode: 'USD',
      countryCode: 'US'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
  };

  onLoadPaymentData = (event: Event): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (paymentData) => {
    console.log('payment authorized', paymentData);
    this.router.navigateByUrl('/sucessorder');
    return {
      transactionState: 'SUCCESS'

    };
  }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }

  getCurrentUser(): User {
    return this.userService.getCurrentUser();

  }

  getPaymentRequest(): google.payments.api.PaymentDataRequest {
    console.log("in get payment request");
    this.paymentRequest.transactionInfo.totalPrice = this.cart.getTotalPrice().toString();
    this.paymentRequest.merchantInfo.merchantId = constant.merchantId;
    this.paymentRequest.merchantInfo.merchantName = constant.merchantName;

    return this.paymentRequest;
  }

  signIn() {
    console.log("signin")
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "472967234950-2a4jr2lag1r4efkqpdscmao4vtr3thc4.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: true,
      data_auto_select: false,
      cancel_on_tap_outside: true,
    });
    console.log("render signin button");
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" , shape : "pill"}
    );
    console.log("done render signin button");

    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    console.log("prom  signin button");
  }
  async handleCredentialResponse(response: any) {
    // Here will be your response from Google.
    console.log("---------------------------handleCredentialResponse-----------------------");
    // to decode the credential response.
    console.log("in handleCredentialResponse");

    const responsePayload = this.decodeJwtResponse(response.credential);

    let user:User = new User();
    user.id = responsePayload.sub,
      user.fullName =responsePayload.name,
      user.firstName = responsePayload.given_name,
      user.lastName = responsePayload.family_name,
      user.imageUrl =responsePayload.picture,
      user.email =responsePayload.email,
      user.emailVerify = responsePayload.email_verified

    this.userService.setCurrentUser(user);
    console.log("User detail: "+ JSON.stringify(user));
  }
  decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}
