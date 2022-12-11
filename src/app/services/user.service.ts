import { Injectable } from '@angular/core';
import {User} from "../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser : User;

  constructor(){
  }

  getCurrentUser(){
    return this._currentUser;
  }

  setCurrentUser(value: User) {
    console.log("set current User "+ value);
    this._currentUser = value;

  }
}
