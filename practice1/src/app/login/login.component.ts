import { Component } from '@angular/core';
import { RegesterserviceService } from '../regester/regesterservice.service';
import { userdata } from '../regester/regester.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private regesterservice : RegesterserviceService, private router : Router){}

  name : string = "";
  password : string = "";
  incorrect :boolean = false;
  disable : boolean = true;
  hide = true;
  customIcon = '../../assets/images/show.png';
  customIcon1 = '../../assets/images/private.png';

  data : userdata[]=[];

  onDataChange(){
    if (this.name.length<1 || this.password.length < 8 || this.name.includes(" ") || this.password.includes(" ")) {
      this.disable=true
    }
    else{
      this.disable=false
    }
  }

  onlogin() {
    this.regesterservice.loadData(this.name, this.password)
      .subscribe(
        (data) => {
          if (data && data['token']) {
            localStorage.setItem('token', data['token']);
            this.router.navigate(['/timelog']);
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
}
