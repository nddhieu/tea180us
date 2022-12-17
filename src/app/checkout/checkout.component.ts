import {Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserService} from "../services/user.service";
import {constant} from "../shared/constant";
import {User} from "../shared/models/user";
import {Subscription} from "rxjs";
import {stringify} from "@angular/compiler/src/util";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../services/cart.service";
import {Cart} from "../shared/models/Cart";
import {Payment} from "../shared/models/payment";
import {OrderService} from "../services/order.service";
// import {FormBuilder, FormGroup} from "@angular/forms";
// import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  customerName: String = "guest";
  private orderName: string;

  private subcriberUserSignedIn: Subscription;
  cart : Cart;
  isDisplayOrderForm: boolean = false;
  cartService: CartService;
  userService: UserService
  shopName: string = constant.shopName;
  // userFormGroup: FormGroup;
  form: FormGroup;
  private orderPhone: string;
  isOrderInfoFilled: boolean = false;
  googlePayEnvironment: string = constant.googlePayEnvironment;

  constructor(userService: UserService, private router: Router , fb:FormBuilder, cartService:CartService, private orderService: OrderService) {
    this.cartService = cartService;
    this.userService = userService;
    this.form=fb.group({
      name: ['', Validators.required],
      phone:['', Validators.required]
    });
    this.customerName= this.userService.getCurrentUser() != null ? this.userService.getCurrentUser().fullName : null;

  }

  ngOnInit(): void {
    this.customerName= this.userService.getCurrentUser() != null ? this.userService.getCurrentUser().fullName : null;
    console.log("this.customerName " + this.customerName);
    this.cart = this.cartService.getCart();
    if (this.customerName) {
      this.isDisplayOrderForm = true;
      console.log("user already signed in ");
      this.showWelcomeText(true);
      this.setCustomerNameForNeedField();
      // document.getElementById("welcome").innerHTML = "Welcome " + this.customerName + "to "+ constant.shopName;
    } else {//user not signed, remind signin to continue
      this.isDisplayOrderForm = false;
      // let welcomeEle = document.getElementById("welcome");
      // welcomeEle.setAttribute("style","font-size: medium");
      this.showWelcomeText(false);

      // welcomeEle.innerHTML = "Please sign in to continue checkout";
    }
    this.subcriberUserSignedIn = this.userService.userSignedIn.subscribe(signedInUser => {
      console.log("userSIgnedin "+ JSON.stringify(signedInUser));
      if (signedInUser.fullName != null && this.customerName != signedInUser.fullName){
        console.log("user has signed in");
        this.customerName= signedInUser.fullName;
        console.log("this.customerName "+ this.customerName );
        this.showWelcomeText(true);
        this.setCustomerNameForNeedField();

        // document.getElementById("orderName").setAttribute("placeholder",this.customerName.toString());
        // document.getElementById("orderName").setAttribute("value",this.customerName.toString());


      }

    });


  }

  private setCustomerNameForNeedField() {
    let welcomeEle = document.getElementById("customer-name");
    welcomeEle.innerText = this.customerName.toString();
    this.form.get("name").setValue(this.customerName);
  }

  private showWelcomeText(display:boolean) {
    document.getElementById("welcome").hidden = !display;
    document.getElementById("remindSignIn").hidden = display;
    document.getElementById("order-form").hidden = !display;

  }

  getCustomerName():String {
    console.log("getCustomerName");
    return this.userService.getCurrentUser() != null ? this.userService.getCurrentUser().fullName : null;
  }
  ngOnDestroy() {
    this.subcriberUserSignedIn.unsubscribe();
  }



  onSubmitOrderForm() {
    this.validateAllFormFields(this.form);
    if (this.form.valid) {
      console.log('form submitted');
      console.log("name "+ this.form.get("name").value);
      console.log("phone "+ this.form.get("phone").value);
      this.orderName = this.form.get("name").value;
      this.orderPhone = this.form.get("phone").value;
      this.cartService.setContactOrderToCart(this.orderName, this.orderPhone);
      this.isOrderInfoFilled = true;
    } else {
      // validate all form fields
      this.validateAllFormFields(this.form)
    }
  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
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
    console.log('payment authorized',JSON.stringify( paymentData));
    let payment:Payment ={
      paymentDescription: paymentData.paymentMethodData.description,
      cardDetail: paymentData.paymentMethodData.info.cardDetails,
      type: paymentData.paymentMethodData.type,
      tokenizationData:paymentData.paymentMethodData.tokenizationData,
      cartNetwork:paymentData.paymentMethodData.info.cardNetwork,
      billingAddress:paymentData.paymentMethodData.info.billingAddress
    }
    this.orderService.savePayment(payment);
    this.cartService.clearCart();

    this.router.navigateByUrl('/successorder');
    return {
      transactionState: 'SUCCESS'

    };
  }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }

  getPaymentRequest(): google.payments.api.PaymentDataRequest {
    console.log("in get payment request");
    this.paymentRequest.transactionInfo.totalPrice = this.cart.getTotalCostIncludeTax().toString();
    this.paymentRequest.merchantInfo.merchantId = constant.merchantId;
    this.paymentRequest.merchantInfo.merchantName = constant.merchantName;

    return this.paymentRequest;
  }

}
