import { Component } from '@angular/core';
import { RegesterserviceService } from './regesterservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.css']
})
export class RegesterComponent {

  constructor(private regesteservice : RegesterserviceService, private router : Router){}

  name : string = "";
  password : string = "";
  cpassword : string = "";
  email : string = "";


  incorrect :boolean = false;
  incorrect1 :boolean = false;
  incorrect2 :boolean = false;
  incorrect3 :boolean = false;
  disable : boolean = true;
  termsAndConditions: boolean = false;


  hide = true;
  customIcon = '../../assets/images/show.png';
  customIcon1 = '../../assets/images/private.png';

  data : userdata[]=[];

  onDataChange(){
    if (this.name.length<1 || this.password.length < 8 || this.name.includes(" ") || this.password.includes(" ") || this.cpassword.length < 8 || this.cpassword.includes(" ") || !this.email.includes("@") || !this.email.includes(".")) {
      this.disable=true
    }
    else{
      this.disable=false
    }
  }

  onregester() {
    if(this.password === this.cpassword){
      if(this.termsAndConditions){
        this.regesteservice.regUser({ username: this.name, password: this.password, email:this.email })
      .subscribe(
        (responseData: any) => {
          if(responseData){
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          if (error.status === 409) {
            this.incorrect1 = true;
          } else {
            console.log('An error occurred:', error);
          }
        }
      );
      this.incorrect3= false;
      }else{
        this.incorrect3= true;
      }
      this.incorrect2= false;

    }else{
      this.incorrect2 = true;
    }

  }
}


export interface userdata{
  username:string,
  password:string,
  email:string
}
