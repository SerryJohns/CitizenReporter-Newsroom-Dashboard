import { Injectable } from '@angular/core';
import { Parse } from 'parse';

@Injectable()
export class AuthenticationService {

  constructor() { }

  logIn(username: String, password: String, success: () => void, error: () => void) {
    Parse.User.logIn(username, password).then(function(){
      success();
      }, function (e){
      error();
    });
  }

}
