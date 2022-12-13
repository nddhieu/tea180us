import {EventEmitter, Injectable, Output} from '@angular/core';
import {User} from "../shared/models/user";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser : User ;
  private userSignedInSource = new BehaviorSubject<User>(new User());
  userSignedIn = this.userSignedInSource.asObservable();

  constructor(){
  }

  getCurrentUser(){
    return this._currentUser;
  }

  setCurrentUser(value: User) {
    console.log("set current User in userService");
    this._currentUser = value;
    this.userSignedInSource.next(this._currentUser);
  }

}
