import { Component, OnInit } from '@angular/core';
import { RegesterserviceService } from '../regester/regesterservice.service';
import { userdata } from '../regester/regester.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private regesterservice: RegesterserviceService, private router: Router) { }

  email: string = "";
  password: string = "";
  incorrect: boolean = false;
  disable: boolean = true;
  hide = true;
  rememberme: boolean = false;

  customIcon = '../../assets/images/show.png';
  customIcon1 = '../../assets/images/private.png';

  data: userdata[] = [];

  onDataChange() {
    if (this.password.length < 8 || !this.email.includes("@") || !this.email.includes(".")) {
      this.disable = true
    }
    else {
      this.disable = false
    }
  }

  onlogin() {
    this.regesterservice.loadData(this.email, this.password)
      .subscribe(
        (data) => {
          if (data && data['token']) {
            localStorage.setItem('token', data['token']);
            if (this.rememberme) {
              const rememberMeData = {
                email: this.email, password: this.password, rememberme: this.rememberme
              };
              localStorage.setItem('rememberMeData',JSON.stringify(rememberMeData));
              this.router.navigate(['/timelog']);
            }
          }
        },
        (error) => {
          if (error.status === 404) {
            this.incorrect = true;
          } else {
            console.log('An error occurred:', error);
          }
        }
      );
  }

  rememberMeFun() {
    const rememberMeData = localStorage.getItem('rememberMeData');
    if (rememberMeData) {
      const { email, password, rememberme } = JSON.parse(rememberMeData);
      this.email = email;
      this.password = password;
      this.rememberme = rememberme;
      this.onDataChange();
    }
  }

  ngOnInit() {
    this.rememberMeFun()
  }
}
