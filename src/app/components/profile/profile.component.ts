import { Component, OnInit } from '@angular/core';
import { Parse, ParseUser } from 'parse';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: ParseUser;
  name: String;
  email: String;
  username: String;
  password: String;
  errorMessage: String;

  constructor() { }

  ngOnInit() {
    this.currentUser = Parse.User.current();
    this.name = this.currentUser.attributes['name'];
    this.email = this.currentUser.getEmail();
    this.username = this.currentUser.getUsername();
  }

  saveChanges(): void {
    if (this.name && this.username && this.email) {
      const self = this;
      this.currentUser.set('name', this.name);
      this.currentUser.setEmail(this.email);
      this.currentUser.setUsername(this.username);
      this.currentUser.save(null, {
        success: function(user) {
          self.errorMessage = 'Your changes have been successfully saved';
        },
        error: function(user, error) {
          self.errorMessage = 'Failed to save your changes, with error code: ' + error.message;
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields and try again!';
    }
  }

  changePassword(): void {
    if (this.password) {
      const self = this;
      this.currentUser.setPassword(this.password);
      this.currentUser.save(null, {
        success: function(user) {
          self.errorMessage = 'Password has been successfully changed';
        },
        error: function(user, error) {
          self.errorMessage = 'Failed to change password, with error code: ' + error.message;
        }
      });
    } else {
      this.errorMessage = 'Password field cannot be empty';
    }
  }

}
