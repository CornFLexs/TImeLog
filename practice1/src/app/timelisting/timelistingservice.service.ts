import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { data } from './timelisting.component';

@Injectable({
  providedIn: 'root'
})
export class TimelistingserviceService {

  constructor(private http: HttpClient) { }

   // Add data to the database
   createpost(data: data) {
    this.http.post('https://timedlog-backend.onrender.com/api/tasks', data).subscribe(
      (responsedata: any) => {
        console.log(responsedata);
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
  }

  //load data from databse for specific date
  loadData(todayDate: any) {
    const username = this.nameFromToken();
    const url = `https://timedlog-backend.onrender.com/api/tasks?date=${todayDate}&username=${username}`;

    return this.http
      .get<{ [key: string]: any }>(url)
      .pipe(
        map((resdata) => {
          const pdata = [];
          let ttime = 0;
          for (const key in resdata) {
            if (resdata.hasOwnProperty(key)) {
              const post = { ...resdata[key], id: key };
              pdata.push(post);
              ttime += post.Minute;
            }
          }
          return { pdata, ttime };
        })
      );
  }

  nameFromToken(){
    const token = localStorage.getItem('token'); // Assuming the token is stored with the key 'token'

    if (token) {
      const tokenPayload = token.split('.')[1]; // JWT token consists of three parts separated by '.'
      const base64Url = tokenPayload.replace('-', '+').replace('_', '/');
      const decodedToken = JSON.parse(window.atob(base64Url));
      const username = decodedToken.username; // Assuming the username is stored in the 'username' field

      return username

    } else {
      console.log('Token not found in local storage');
    }
  }

  //delete data from database
  delData(data: string) {
    this.http.delete(`https://timedlog-backend.onrender.com/api/tasks/${data}`).subscribe(
      () => {
        console.log('Data deleted successfully');
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
  }

  //update data in database
  updData(data:data,id:string){
    this.http.put(`https://timedlog-backend.onrender.com/api/tasks/${id}`,data).subscribe(
      (responseData :any)=>{
        console.log("Data Updated",responseData)
      },
      (error)=>{
        console.log("error occured",error)
      }
    )
  }


}
