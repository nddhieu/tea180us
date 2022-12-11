import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../shared/models/user";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService : UserService, private cartService: CartService) { }

  ngOnInit(): void {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "472967234950-2a4jr2lag1r4efkqpdscmao4vtr3thc4.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      data_auto_select: false,
      cancel_on_tap_outside: false,
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

  onSignout() {
    console.log("sign out click")
    // @ts-ignore
    google.accounts.id.disableAutoSelect();
    location.reload();
  }

  onCartClick() {
    this.cartService.toggleDisplayCart();
  }
}
