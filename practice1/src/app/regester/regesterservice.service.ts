import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RegesterserviceService {

  constructor(private http : HttpClient , private router : Router) { }

  regUser(userData: any) {
    return this.http.post('https://timedlog-backend.onrender.com/api/register', userData);
    // return this.http.post('http://localhost:3000/api/register', userData);
  }


  loadData(email: string, password: string) {
    return this.http.get<{ [key: string]: any }>(`https://timedlog-backend.onrender.com/api/register?email=${email}&password=${password}`)
    // return this.http.get<{ [key: string]: any }>(`http://localhost:3000/api/register?email=${email}&password=${password}`)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
