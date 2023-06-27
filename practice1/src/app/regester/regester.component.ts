import { Component } from '@angular/core';
import { RegesterserviceService } from './regesterservice.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.css']
})
export class RegesterComponent {

  constructor(private regesteservice: RegesterserviceService, private router: Router) { }

  name: string = "";
  password: string = "";
  cpassword: string = "";
  email: string = "";


  incorrect: boolean = false;
  incorrect1: boolean = false;
  incorrect2: boolean = false;
  incorrect3: boolean = false;
  incorrect4: boolean = false;
  disable: boolean = true;
  termsAndConditions: boolean = false;


  hide = true;
  customIcon = '../../assets/images/show.png';
  customIcon1 = '../../assets/images/private.png';

  data: userdata[] = [];

  onDataChange() {
    if (this.name.length < 1 || this.password.length < 8 || this.name.includes(" ") || this.password.includes(" ") || this.cpassword.length < 8 || this.cpassword.includes(" ") || !this.email.includes("@") || !this.email.includes(".")) {
      this.disable = true
    }
    else {
      this.disable = false
    }
  }

  onregister() {
    if (this.password === this.cpassword) {
      if (this.termsAndConditions) {
        this.regesteservice.regUser({ username: this.name, password: this.password, email: this.email })
          .subscribe(
            (responseData: any) => {
              if (responseData) {
                this.regesteservice.loadData(this.email, this.password)
                  .subscribe(
                    (data) => {
                      if (data && data['token']) {
                        localStorage.setItem('token', data['token']);

                        this.router.navigate(['/timelog']);
                      }
                    }
                  );
              }
            },
            (error) => {
              if (error.status === 409) {
                if (error.error === 'Username already exists') {
                  this.incorrect1 = true; // Username exists
                  // this.name = "";
                } else if (error.error === 'Email already exists') {
                  this.incorrect4 = true; // Email exists
                  this.incorrect1 = false; // Username exists
                  // this.email = "";
                }
              } else {
                console.log('An error occurred:', error);
              }
            }
          );
        this.incorrect3 = false;
        this.incorrect1 = false;
        this.incorrect4 = false;
      } else {
        this.incorrect3 = true;
      }
      this.incorrect2 = false;
      this.incorrect1 = false;
      this.incorrect4 = false;

    } else {
      this.incorrect2 = true;
      this.incorrect1 = false;
      this.incorrect4 = false;
      this.incorrect3 = false;
    }

  }

}


export interface userdata {
  username: string,
  password: string,
  email: string
}
