import {Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserService} from "../services/user.service";
import {constant} from "../shared/constant";
import {User} from "../shared/models/user";
import {Subscription} from "rxjs";
import {stringify} from "@angular/compiler/src/util";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CartService} from "../services/cart.service";
// import {FormBuilder, FormGroup} from "@angular/forms";
// import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  customerName: String = "guest";
  orderName: any;

  private subcriberUserSignedIn: Subscription;
  isDisplayOrderForm: boolean = false;
  cartService: CartService;
  userService: UserService
  shopName: string = constant.shopName;
  // userFormGroup: FormGroup;
  form: FormGroup;

  constructor(userService: UserService, private router: Router , fb:FormBuilder, cartService:CartService) {
    this.cartService = cartService;
    this.userService = userService;
    this.form=fb.group({
      phone:['']
    });
    this.customerName= this.userService.getCurrentUser() != null ? this.userService.getCurrentUser().fullName : null;

  }

  ngOnInit(): void {
    this.customerName= this.userService.getCurrentUser() != null ? this.userService.getCurrentUser().fullName : null;
    console.log("this.customerName " + this.customerName);
    if (this.customerName) {
      this.isDisplayOrderForm = true;
      console.log("user already signed in ");
      this.showWelcomeText(true);

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
        let welcomeEle = document.getElementById("customer-name");
        welcomeEle.innerText = this.customerName.toString();

        document.getElementById("orderName").setAttribute("placeholder",this.customerName.toString());
        document.getElementById("orderName").setAttribute("value",this.customerName.toString());


      }

    //  form validation
    //   this.userFormGroup = this.formBuilder.group({
    //     phoneNumber:['', RxwebValidators.mask({mask:'(999)-999 9999' })],
    //   });
    });


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
  // onSubmit(){
  //   console.log(this.userFormGroup.value);
  // }


  onSubmitOrderForm() {

  }
}
