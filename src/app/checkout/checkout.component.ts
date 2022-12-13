import {Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserService} from "../services/user.service";
import {constant} from "../shared/constant";
import {User} from "../shared/models/user";
import {Subscription} from "rxjs";
import {stringify} from "@angular/compiler/src/util";
import {Router} from "@angular/router";
// import {FormBuilder, FormGroup} from "@angular/forms";
// import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  customerName: String = null;

  private subcriber: Subscription;
  private subcriberUserSignedIn: Subscription;


  shopName: string = constant.shopName;
  // userFormGroup: FormGroup;

  constructor(private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.customerName= this.userService.getCurrentUser() != null ? this.userService.getCurrentUser().fullName : null;
    console.log("this.customerName " + this.customerName);
    if (this.customerName) {
      console.log("user already signed in ");
      document.getElementById("welcome").innerHTML = "Welcome " + this.customerName + "to "+ constant.shopName;
    } else {
      document.getElementById("welcome").innerHTML = "Please sign in to continue checkout";
    }
    this.subcriberUserSignedIn = this.userService.userSignedIn.subscribe(signedInUser => {
      console.log("userSIgnedin "+ JSON.stringify(signedInUser));
      if (signedInUser.fullName != null){
        console.log("user has signed in");
        this.customerName= signedInUser.fullName;
        console.log("this.customerName "+ this.customerName );
        document.getElementById("welcome").innerHTML = "Welcome " + this.customerName + " to "+ constant.shopName;
      }

    //  form validation
    //   this.userFormGroup = this.formBuilder.group({
    //     phoneNumber:['', RxwebValidators.mask({mask:'(999)-999 9999' })],
    //   });
    });


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


}
