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
    this.http.post('http://localhost:3000/api/tasks', data).subscribe(
      (responsedata: any) => {
        console.log(responsedata);
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
  }

  //load data from databse for specific date
  loadData(todayDate:any) {
    return this.http
      .get<{ [key: string]: any }>(`http://localhost:3000/api/tasks?date=${todayDate}`)
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
      )
  }


  //delete data from database
  delData(data: string) {
    this.http.delete(`http://localhost:3000/api/tasks/${data}`).subscribe(
      () => {
        console.log('Data deleted successfully');
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
  }

}
