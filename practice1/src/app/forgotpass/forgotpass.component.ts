import { Component } from '@angular/core';
import { ForgopassService } from './forgopass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent {

  disable: boolean = true;
  disable1: boolean = true;
  disable2: boolean = true;
  incorrect: boolean = false;
  incorrect1: boolean = false;
  found: boolean = false;

  constructor(private forgotpass: ForgopassService, private router: Router) { }

  email: string = ""
  password: string = ""
  cpassword: string = ""


  onDataChange() {
    if (!this.email.includes("@") || !this.email.includes(".")) {
      this.disable = true
    }
    else {
      this.disable = false
    }
  }

  onDataChange1() {
    if (this.password.length < 8 || this.password.includes(" ") || !this.password || this.cpassword.length < 8 || this.cpassword.includes(" ") || !this.cpassword) {
      this.disable1 = true
    }
    else {
      this.disable1 = false
    }
  }

  onforgot() {
    this.forgotpass.findEmail(this.email).subscribe(
      (data) => {
        if (data) {
          this.disable2 = false;
          this.incorrect = false;
          this.found = true
        }
      },
      (error) => {
        if (error.status === 404) {
          this.incorrect = true;
          this.found = false
          this.disable2 = true;
        } else {
          this.incorrect = true;
          this.found = false;
          this.disable2 = true;
          console.log('An error occurred:', error);
        }
      }
    );
  }

  onreset() {
    if (this.password === this.cpassword) {
      this.incorrect1 = false;
      this.forgotpass.updatePassword(this.email, this.password).subscribe(
        (data) => {
          if (data && data['message']) {
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.log("Error updating password", error);
        }
      );
    }
    else {
      this.incorrect1 = true;
    }
  }
}

