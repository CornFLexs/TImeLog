import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgopassService {

  constructor(private http: HttpClient) { }

  findEmail(email: string) {
    return this.http.get<{ [key: string]: any }>(`https://timedlog-backend.onrender.com/api/findEmail?email=${email}`);
    // return this.http.get<{ [key: string]: any }>(`http://localhost:3000/api/findEmail?email=${email}`);
  }

  updatePassword(email: string, newPassword: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('newPassword', newPassword);
      return this.http.get<any>('https://timedlog-backend.onrender.com/api/updatePassword', { params });
    // return this.http.get<any>('http://localhost:3000/api/updatePassword', { params });
  }

}
