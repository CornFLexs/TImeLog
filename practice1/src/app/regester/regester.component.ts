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
  incorrect :boolean = false;
  incorrect1 :boolean = false;
  disable : boolean = true;

  data : userdata[]=[];

  onDataChange(){
    if (this.name.length<1 || this.password.length < 8 || this.name.includes(" ") || this.password.includes(" ")) {
      this.disable=true
    }
    else{
      this.disable=false
    }
  }

  onregester() {
    this.regesteservice.regUser({ username: this.name, password: this.password })
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
  }
}


export interface userdata{
  username:string,
  password:string
}
